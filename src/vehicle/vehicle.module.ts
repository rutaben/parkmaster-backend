import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleRepository } from './vehicle.repository';
import { Vehicle } from './vehicle.entity';
import { AssetService } from 'src/asset/asset.service';
import { FeeSetting } from 'src/fee-setting/fee-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, FeeSetting])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository, AssetService],
})
export class VehicleModule {}
