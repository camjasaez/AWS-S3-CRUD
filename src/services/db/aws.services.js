import {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { client } from '../../config/aws-s3.js';
import { AWS_BUCKET_NAME } from '../../config/config.js';
import fs from 'fs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const uploadFile = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };
  const uploadCommand = new PutObjectCommand(uploadParams);
  return await client.send(uploadCommand);
};

export const getFiles = async () => {
  const getParams = {
    Bucket: AWS_BUCKET_NAME,
  };
  const getCommand = new ListObjectsCommand(getParams);
  return await client.send(getCommand);
};

export const getFile = async (key) => {
  const getParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };
  const getCommand = new GetObjectCommand(getParams);
  return await client.send(getCommand);
};

export const deleteFile = async (key) => {
  const deleteParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };
  const deleteCommand = new DeleteObjectCommand(deleteParams);
  return await client.send(deleteCommand);
};

export const downloadFile = async (key) => {
  const getParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };
  const getCommand = new GetObjectCommand(getParams);
  const response = await client.send(getCommand);
  response.Body.pipe(fs.createWriteStream(`./downloads/${key}`));
};

export const getFileURL = async (key) => {
  const getParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };
  const getCommand = new GetObjectCommand(getParams);
  return await getSignedUrl(client, getCommand, { expiresIn: 3600 });
};
