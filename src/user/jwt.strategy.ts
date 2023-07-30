import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from 'config';
import { JwtSettingsProps } from 'src/auth/auth.module';

const jwtSettings: JwtSettingsProps = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // Configures Jwt strategy options
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtSettings.secret,
    });
  }

  // Called when request with a valid jwt token (or userToken) is received

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    // If user exists, returns a promise with associated user

    return user;
  }
}
