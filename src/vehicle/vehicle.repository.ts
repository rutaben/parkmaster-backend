import { Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull } from 'typeorm';

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {
    super(
      vehicleRepository.target,
      vehicleRepository.manager,
      vehicleRepository.queryRunner,
    );
  }

  async getVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  // Retrieves parked vehicle from database if plateNumbers match and the vehicle is still in the parking
  async getParkedVehicle(plateNumber: string): Promise<Vehicle> {
    return await this.vehicleRepository.findOne({
      where: {
        plateNumber: plateNumber,
        departure: IsNull(),
      },
    });
  }

  async getVehicleByPlateNumber(plateNumber: string): Promise<Vehicle> {
    return await this.vehicleRepository.findOne({
      where: {
        plateNumber: plateNumber,
      },
    });
  }
}
