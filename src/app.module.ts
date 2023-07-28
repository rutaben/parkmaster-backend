import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { VehicleModule } from './vehicle/vehicle.module';
import { AssetModule } from './asset/asset.module';
import { AwsModule } from './aws/aws.module';
import { FeeSettingModule } from './fee-setting/fee-setting.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    VehicleModule,
    AwsModule,
    AssetModule,
    FeeSettingModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
