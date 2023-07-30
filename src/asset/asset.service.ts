import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class AssetService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  // Defines parameters needed to upload file to s3 bucket

  async uploadFile(file: Buffer, bucketName: string): Promise<any> {
    const uniqueFilename = `${uuidv4()}_${Date.now()}.jpg`;
    const params = {
      Bucket: bucketName,
      Key: uniqueFilename,
      Body: file,
    };

    const uploadResult = await this.s3.upload(params).promise();

    return uploadResult;
  }

  async streamToBuffer(stream: NodeJS.ReadableStream) {
    try {
      const chunks = [];
      const readable = Readable.from(stream);

      await new Promise((resolve, reject) => {
        readable.on('data', (chunk) => {
          chunks.push(chunk);
        });

        readable.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        readable.on('error', (error) => {
          reject(error);
        });
      });

      return Buffer.concat(chunks);
    } catch (error) {}
  }

  async getObjectAsBase64(bucketName: string, key: string) {
    try {
      // Downloads the object as a readable stream from S3
      const stream = this.s3
        .getObject({ Bucket: bucketName, Key: key })
        .createReadStream();

      // Performs transformation from the stream to a buffer and then base64 string
      const buffer = await this.streamToBuffer(stream);
      const base64String = buffer.toString('base64');

      return base64String;
    } catch (error) {}
  }
}
