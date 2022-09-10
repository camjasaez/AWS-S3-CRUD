'use strict';
import { S3Client } from '@aws-sdk/client-s3';
import {
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from './config.js';

/**
 * @name client
 * @description Create a new S3 client instance
 */
export const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});
