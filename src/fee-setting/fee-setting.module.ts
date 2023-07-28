import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeSetting } from './fee-setting.entity';
import { FeeSettingRepository } from './fee-setting.repository';
import { FeeSettingController } from './fee-setting.controller';
import { FeeSettingService } from './fee-setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeeSetting])],
  controllers: [FeeSettingController],
  providers: [FeeSettingService, FeeSettingRepository],
})
export class FeeSettingModule {}
