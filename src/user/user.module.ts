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

// Configures Passport Module to use 'jwt' strategy as default
// Configures JwtModule with secret key for token encoding
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtSettings.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [JwtStrategy, UserRepository],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
