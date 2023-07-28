import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CheckOutVehicleDto {
  @IsNotEmpty()
  @MinLength(5)
  // Longest plates numbers in the world have 12 symbols
  @MaxLength(12)
  @IsString()
  plateNumber: string;
}
