import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeSettingRepository } from './fee-setting.repository';
import { feeSettingDtos } from '../../seeds/fee-setting.seed';
import { FeeSetting } from './fee-setting.entity';

@Injectable()
export class FeeSettingService implements OnModuleInit {
  constructor(
    @InjectRepository(FeeSettingRepository)
    private feeSettingRepository: FeeSettingRepository,
  ) {}

  // Uses initial feeSettings data to create default parking rates on initialization
  async onModuleInit() {
    for (const feeSettingDto of feeSettingDtos) {
      let feeSetting = await this.feeSettingRepository.findOne({
        where: {
          vehicleType: feeSettingDto.vehicleType,
          weekday: feeSettingDto.weekday,
        },
      });

      if (!feeSetting) {
        feeSetting = new FeeSetting();
        feeSetting.vehicleType = feeSettingDto.vehicleType;
        feeSetting.weekday = feeSettingDto.weekday;
        feeSetting.feeRate = feeSettingDto.feeRate;
        await feeSetting.save();
      }
    }
  }
}
