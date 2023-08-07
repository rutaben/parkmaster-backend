import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VehicleService } from './vehicle.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetService } from 'src/asset/asset.service';
import { Vehicle } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';
import { InjectRepository } from '@nestjs/typeorm';

// Jwt authentication guard ensures the user with correct token access the data
@Controller('vehicles')
@UseGuards(AuthGuard('jwt'))
export class VehicleController {
  constructor(
    @InjectRepository(VehicleRepository)
    private vehicleRepository: VehicleRepository,

    private vehicleService: VehicleService,
    private assetService: AssetService,
  ) {}

  @Get()
  getVehicles(): Promise<Vehicle[]> {
    return this.vehicleRepository.getVehicles();
  }

  // Interceptor to handle file upload and set file size/quantity limits
  @Post('/upload')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        // Maximum file size accepted by Plate recognizer Api is 3MB
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  async uploadVehicle(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Vehicle> {
    try {
      if (!file) {
        throw new InternalServerErrorException('No file uploaded');
      }

      // Uploads the file to s3 storage
      const bucketName = process.env.BUCKET_NAME;
      const image = await this.assetService.uploadFile(file.buffer, bucketName);

      if (!image) {
        throw new InternalServerErrorException(
          'Could not upload the vehicle image',
        );
      }

      // Transforms uploaded file to encoded base64 string to be enable passing it to Plate recognizer
      const assetString = await this.assetService.getObjectAsBase64(
        bucketName,
        image.key,
      );

      const result = await this.vehicleService.uploadVehicle(assetString);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not register or checkout the uploaded vehicle',
      );
    }
  }
}
