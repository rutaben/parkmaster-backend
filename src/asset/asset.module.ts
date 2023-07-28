import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';

@Module({
  imports: [],
  providers: [AssetService],
})
export class AssetModule {}
