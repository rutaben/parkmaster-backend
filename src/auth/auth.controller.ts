import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserToken } from '../user/user-token';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Returns userToken after successful sign in which is then set in local storage to ensure only registered person can access the data

  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<UserToken> {
    try {
      return this.authService.signIn(signInDto);
    } catch (e) {}
  }

  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<User> {
    try {
      return this.authService.signUp(signUpDto);
    } catch (e) {}
  }
}
