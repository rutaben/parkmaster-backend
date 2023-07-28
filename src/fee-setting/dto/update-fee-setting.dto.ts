import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';

export class UpdateFeeSettingDto {
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(4)
  feeRate: string;
}
