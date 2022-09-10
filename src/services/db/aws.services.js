'use strict';
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

/**
 * @name uploadFile
 * @description Upload a file to the bucket
 * @param {File} The file to upload.
 * @returns {Promise} The promise object.
 */
export const uploadFile = async (file) => {
  try {
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.name,
      Body: stream,
    };
    const uploadCommand = new PutObjectCommand(uploadParams);
    return await client.send(uploadCommand);
  } catch (error) {
    console.error('[AWS.Services - uploadFile] Error: ', error);
    throw new Error(error.message);
  }
};

/**
 * @name getFiles
 * @description Get all files from the bucket
 * @returns {Promise} The promise object.
 */
export const getFiles = async () => {
  try {
    const getParams = {
      Bucket: AWS_BUCKET_NAME,
    };
    const getCommand = new ListObjectsCommand(getParams);
    return await client.send(getCommand);
  } catch (error) {
    console.error('[AWS.Services - getFiles] Error: ', error);
    throw new Error(error.message);
  }
};

/**
 * @name getFile
 * @description Get a file from the bucket
 * @param {String} key The file name
 * @returns {Promise} The promise object.
 */
export const getFile = async (key) => {
  try {
    const getParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    };
    const getCommand = new GetObjectCommand(getParams);
    return await client.send(getCommand);
  } catch (error) {
    console.error('[AWS.Services - getFile] Error: ', error.message);
    throw new Error(error.message);
  }
};

/**
 * @name deleteFile
 * @description Delete a file from the bucket
 * @param {String} key The file name
 * @returns {Promise} The promise object.
 */
export const deleteFile = async (key) => {
  try {
    const deleteParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    return await client.send(deleteCommand);
  } catch (error) {
    console.error('[AWS.Services - deleteFile] Error: ', error);
    throw new Error(error.message);
  }
};

/**
 * @name downloadFile
 * @description Download a file from the bucket
 * @param {String} key The file name
 */
export const downloadFile = async (key) => {
  try {
    const getParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    };
    const getCommand = new GetObjectCommand(getParams);
    const response = await client.send(getCommand);
    response.Body.pipe(fs.createWriteStream(`./downloads/${key}`));
  } catch (error) {
    console.error('[AWS.Services - downloadFile] Error: ', error);
    throw new Error(error.message);
  }
};

/**
 * @name getFileURL
 * @description Get a file URL from the bucket
 * @param {String} key The file name
 * @returns {String} The file URL
 */
export const getFileURL = async (key) => {
  try {
    await getFile(key);
    const getParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    };
    const getCommand = new GetObjectCommand(getParams);
    return await getSignedUrl(client, getCommand, {
      expiresIn: 3600,
    });
  } catch (error) {
    console.error('[AWS.Services - getFileURL] Error: ', error);
    throw new Error(error.message);
  }
};
