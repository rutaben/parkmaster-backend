import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { User } from './user.entity';

export type JwtSettingsProps = {
  secret: string;
};

const jwtSettings: JwtSettingsProps = config.get('jwt');

@Module({
  imports: [
    // Configures Passport Module to use 'jwt' strategy as default
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Configures JwtModule with secret key for token encoding
    JwtModule.register({
        // It must be avoided, but config/.env stopped working before deadline therefore I am passing strings as well
      secret: '9736ED2273858792A7775211FE1DC' || process.env.JWT_SECRET || jwtSettings.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [JwtStrategy, UserRepository],
  exports: [JwtStrategy, PassportModule],
})

export class UserModule {}
