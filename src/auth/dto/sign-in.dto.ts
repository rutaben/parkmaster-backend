import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
