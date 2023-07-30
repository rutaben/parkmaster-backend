import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as config from 'config';
import { s3SettingsProps } from 'src/vehicle/vehicle.controller';

const s3Settings: s3SettingsProps = config.get('s3');

// Sets up AWS SDK with the provided access keys and region

@Injectable()
export class AwsService {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || s3Settings.accessKeyId,
      secretAccessKey:
        process.env.AWS_SECRET_ACCESS_KEY || s3Settings.secretAccessKey,
      region: process.env.AWS_REGION || s3Settings.region,
      apiVersion: 'latest',
    });
  }
}
