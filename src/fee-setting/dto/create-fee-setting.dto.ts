import { IsEnum, IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';
import { VehicleType } from 'src/common/enums/vehicle-type.enum';
import { Weekday } from 'src/common/enums/weekday.enum';

export class CreateFeeSettingDto {
  @IsNotEmpty()
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  weekday: Weekday;

  @IsNotEmpty()
  @MaxLength(4)
  @IsNumberString()
  feeRate: string;
}
