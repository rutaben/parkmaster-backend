import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

// Sets up AWS SDK with the provided access keys and region

@Injectable()
export class AwsService {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      apiVersion: 'latest',
    });
  }
}
