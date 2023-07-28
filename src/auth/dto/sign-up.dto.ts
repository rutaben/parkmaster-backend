import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  confirmPassword: string;
}
