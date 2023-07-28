import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeeSetting } from './fee-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeSettingRepository } from './fee-setting.repository';
import { ValidatedNumberPipe } from 'src/common/custom-pipes/validated-number.pipe';
import { UpdateFeeSettingDto } from './dto/update-fee-setting.dto';

@Controller('fee-settings')
// Jwt authentication guard ensures the user with correct token access the data
@UseGuards(AuthGuard('jwt'))
export class FeeSettingController {
  constructor(
    @InjectRepository(FeeSettingRepository)
    private feeSettingRepository: FeeSettingRepository,
  ) {}

  @Get()
  getfeeSettings(): Promise<FeeSetting[]> {
    return this.feeSettingRepository.getFeeSetting();
  }

  @Patch('/:id')
  updateFeeSetting(
    @Param('id', new ValidatedNumberPipe()) id: number,
    @Body() updateFeeSettingDto: UpdateFeeSettingDto,
  ): Promise<FeeSetting> {
    return this.feeSettingRepository.updateFeeSetting(id, updateFeeSettingDto);
  }
}
