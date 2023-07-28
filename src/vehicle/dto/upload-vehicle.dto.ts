import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { VehicleType } from '../../common/enums/vehicle-type.enum';

export class UploadVehicleDto {
  @IsNotEmpty()
  @MinLength(5)
  // Longest plates numbers in the world have 12 symbols
  @MaxLength(12)
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  vehicle: VehicleType;
}
