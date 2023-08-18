import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import * as fetch from 'node-fetch';
import * as FormData from 'form-data';
import { Vehicle } from './vehicle.entity';
import { VehicleType } from 'src/common/enums/vehicle-type.enum';
import { FeeSetting } from 'src/fee-setting/fee-setting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Weekday } from 'src/common/enums/weekday.enum';

@Injectable()
export class VehicleService {
  constructor(
    private vehicleRepository: VehicleRepository,

    @InjectRepository(FeeSetting)
    private feeSettingRepository: Repository<FeeSetting>,
  ) {}

  async getVehicles(): Promise<Vehicle[]> {
    const allVehicles = this.vehicleRepository.getVehicles();
    return allVehicles;
  }

  // Method to upload a vehicle based on a base64 image

  async uploadVehicle(base64Image: string): Promise<any> {
    // Passing encoded base64 image string for Plate recognizer analysis
    const recognizedVehicleData = await this.recognizeVehicleData(base64Image);

    const plateNumber = recognizedVehicleData.results[0].plate;
    const vehicleType = this.getVehicleTypeFromRecognizedType(
      recognizedVehicleData.results[0].vehicle.type,
    );

    // Checks is recognized vehicle is parked, in other case, creates a new one
    const parkedVehicle = await this.vehicleRepository.getParkedVehicle(
      plateNumber,
    );

    if (!parkedVehicle) {
      const vehicle = new Vehicle();
      vehicle.plateNumber = plateNumber;
      vehicle.vehicleType = vehicleType;
      vehicle.arrival = new Date();

      return this.vehicleRepository.save(vehicle);
    }

    // On second upload vehicle is recognized as parked and checkOutVehicle method is called
    return this.checkOutVehicle(plateNumber);
  }

  // As Plate recognizer has its own types, they are transformed for application needs

  private getVehicleTypeFromRecognizedType(
    recognizedType: string,
  ): VehicleType {
    if (
      recognizedType === 'Big Truck' ||
      recognizedType === 'Bus' ||
      recognizedType === ' Pickup Truck'
    ) {
      return VehicleType.BUS_OR_TRUCK;
    }

    if (
      recognizedType === 'Sedan' ||
      recognizedType === 'SUV' ||
      recognizedType === 'Van'
    ) {
      return VehicleType.CAR;
    }

    // Remaining types are Motorcycle and Unknown, there in order to avoid mistakenly overcharging customers I am setting motorcycle (lowest price) if the vehicle cannot be recognized
    return VehicleType.MOTORCYCLE;
  }

  // Method to recognize vehicle data using api service
  private async recognizeVehicleData(base64Image: any): Promise<any> {
    const body = new FormData();
    body.append('upload', base64Image);
    body.append('regions', 'lt');

    try {
      const response = await fetch(
        'https://api.platerecognizer.com/v1/plate-reader/',
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${process.env.PLATE_RECOGNIZER_TOKEN}`,
          },
          body: body,
        },
      );

      return await response.json();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to recognize vehicle data',
      );
    }
  }

  // Method to checkOut vehicle from the parking lot when it is leaving
  private async checkOutVehicle(plateNumber: string): Promise<Vehicle> {
    // Checkouts incorrect vehicle

    const vehicle = await this.vehicleRepository.getParkedVehicle(plateNumber);

    // Departure time is current time
    vehicle.departure = new Date();

    // Calculation of time difference between arrival and departure
    const getTimeDifferenceInMilliseconds = (
      startDate: Date,
      endDate: Date,
    ): number => {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();

      return endTime - startTime;
    };

    const getTimeDifferenceInHours = (
      startDate: Date,
      endDate: Date,
    ): number => {
      const timeDifferenceInMilliseconds = getTimeDifferenceInMilliseconds(
        startDate,
        endDate,
      );
      return timeDifferenceInMilliseconds / (1000 * 60 * 60);
    };

    const totalTime = getTimeDifferenceInHours(
      vehicle.arrival,
      vehicle.departure,
    );

    // Total time is rounded up to the next hour when using parking lots
    const totalTimeRoundedUp = Math.ceil(totalTime);

    vehicle.timeTotal = totalTimeRoundedUp;

    // Checks the weekday when vehicle has arrived and returs enum of according feeRate period
    const getArrivalWeekday = (date: Date): Weekday => {
      const dayOfWeek = (date: Date) => date.getDay();

      const isMondayThursday = (date: Date): boolean => {
        return dayOfWeek(date) >= 1 && dayOfWeek(date) <= 4;
      };
      const isFriday = (date: Date): boolean => {
        return dayOfWeek(date) === 5;
      };
      const isSaturday = (date: Date): boolean => {
        return dayOfWeek(date) === 6;
      };

      const isSunday = (date: Date): boolean => {
        return dayOfWeek(date) === 7;
      };

      switch (true) {
        case isMondayThursday(date):
          return Weekday.MONDAY_TO_THURSDAY;
        case isFriday(date):
          return Weekday.FRIDAY;
        case isSaturday(date):
          return Weekday.SATURDAY;
        case isSunday(date):
          return Weekday.SUNDAY;
        default:
          return;
      }
    };

    // Total price calculation by vehicle type assuming the parking lot closes during out of service hours

    const feeSetting = await this.feeSettingRepository.findOne({
      where: {
        vehicleType: vehicle.vehicleType,
        weekday: getArrivalWeekday(vehicle.arrival),
      },
    });

    if (!feeSetting) {
      throw new NotFoundException(
        'Could not find the fee rate for the vehicle',
      );
    }

    // Using parseFloat to convert string to number and to preserve numbers after comma
    const feeRate = parseFloat(feeSetting.feeRate);

    const feeTotal = feeRate * totalTimeRoundedUp;
    vehicle.feeTotal = feeTotal.toString();

    await this.vehicleRepository.manager.save(vehicle);

    return vehicle;
  }
}
