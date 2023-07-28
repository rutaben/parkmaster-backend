import { Module } from '@nestjs/common';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from 'src/user/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
      secret:
        '9736ED2273858792A7775211FE1DC' ||
        process.env.JWT_SECRET ||
        jwtSettings.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
