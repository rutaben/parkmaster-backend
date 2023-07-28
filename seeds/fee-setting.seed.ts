import { VehicleType } from 'src/common/enums/vehicle-type.enum';
import { Weekday } from 'src/common/enums/weekday.enum';
import { CreateFeeSettingDto } from 'src/fee-setting/dto/create-fee-setting.dto';

// Initial data seed for default parking fee rates

export const feeSettingDtos: CreateFeeSettingDto[] = [
  {
    vehicleType: VehicleType.MOTORCYCLE,
    weekday: Weekday.MONDAY_TO_THURSDAY,
    feeRate: '0.5',
  },
  {
    vehicleType: VehicleType.MOTORCYCLE,
    weekday: Weekday.FRIDAY,
    feeRate: '1.5',
  },
  {
    vehicleType: VehicleType.MOTORCYCLE,
    weekday: Weekday.SATURDAY,
    feeRate: '2',
  },
  {
    vehicleType: VehicleType.MOTORCYCLE,
    weekday: Weekday.SUNDAY,
    feeRate: '0',
  },
  {
    vehicleType: VehicleType.CAR,
    weekday: Weekday.MONDAY_TO_THURSDAY,
    feeRate: '1',
  },
  {
    vehicleType: VehicleType.CAR,
    weekday: Weekday.FRIDAY,
    feeRate: '2',
  },
  {
    vehicleType: VehicleType.CAR,
    weekday: Weekday.SATURDAY,
    feeRate: '4',
  },
  {
    vehicleType: VehicleType.CAR,
    weekday: Weekday.SUNDAY,
    feeRate: '0',
  },
  {
    vehicleType: VehicleType.BUS_OR_TRUCK,
    weekday: Weekday.MONDAY_TO_THURSDAY,
    feeRate: '2',
  },
  {
    vehicleType: VehicleType.BUS_OR_TRUCK,
    weekday: Weekday.FRIDAY,
    feeRate: '3.5',
  },
  {
    vehicleType: VehicleType.BUS_OR_TRUCK,
    weekday: Weekday.SATURDAY,
    feeRate: '5',
  },
  {
    vehicleType: VehicleType.BUS_OR_TRUCK,
    weekday: Weekday.SUNDAY,
    feeRate: '0',
  },
];
