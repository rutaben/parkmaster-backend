import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FeeSetting } from './fee-setting.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFeeSettingDto } from './dto/update-fee-setting.dto';

@Injectable()
export class FeeSettingRepository extends Repository<FeeSetting> {
  constructor(
    @InjectRepository(FeeSetting)
    private feeSettingRepository: Repository<FeeSetting>,
  ) {
    super(
      feeSettingRepository.target,
      feeSettingRepository.manager,
      feeSettingRepository.queryRunner,
    );
  }

  async getFeeSetting(): Promise<FeeSetting[]> {
    const query = this.createQueryBuilder('fee-setting');

    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateFeeSetting(
    id: number,
    updateFeeSetting: UpdateFeeSettingDto,
  ): Promise<FeeSetting> {
    const { feeRate } = updateFeeSetting;

    // Accepts id and according to it updates the feeSetting

    const feeSetting = await this.feeSettingRepository.findOne({
      where: {
        id: id,
      },
    });

    feeSetting.feeRate = feeRate;

    this.feeSettingRepository.manager.save(feeSetting);

    return feeSetting;
  }
}
