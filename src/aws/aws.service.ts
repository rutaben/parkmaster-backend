import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as config from 'config';
import { s3SettingsProps } from 'src/vehicle/vehicle.controller';

const s3Settings: s3SettingsProps = config.get('s3');

// Sets up AWS SDK with the provided access keys and region

@Injectable()
export class AwsService {
  // It must be avoided, but config/.env stopped working before deadline therefore I am passing strings as well
  constructor() {
    AWS.config.update({
      accessKeyId:
        'AKIAWHFM4MWICRRI3SPU' ||
        process.env.AWS_ACCESS_KEY_ID ||
        s3Settings.accessKeyId,
      secretAccessKey:
        '1NWCU9aFQ+t/0jsAzig6q/0bURM2qS7VRoWOwakn' ||
        process.env.AWS_SECRET_ACCESS_KEY ||
        s3Settings.secretAccessKey,
      region: 'eu-north-1',
    });
  }
}
