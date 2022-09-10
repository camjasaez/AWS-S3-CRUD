'use strict';
import {
  uploadFile,
  getFiles,
  downloadFile,
  getFileURL,
  deleteFile,
} from '../services/db/aws.services.js';
import { responseSuccess, responseError } from '../utils/responses.js';

/**
 * @name createFile
 * @description Create a new file in the bucket
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const createFile = async (req, res) => {
  try {
    const { file } = req.files;
    const response = await uploadFile(file);
    responseSuccess(
      res,
      response.$metadata.httpStatusCode,
      `File ${file.name} uploaded`,
      response
    );
  } catch (error) {
    responseError(res, 500, error.message);
  }
};

/**
 * @name listFiles
 * @description List all files in the bucket
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const listFiles = async (req, res) => {
  try {
    const { Contents } = await getFiles();
    responseSuccess(res, 200, `The list of objects`, Contents);
  } catch (error) {
    responseError(res, 500, error.message);
  }
};

/**
 * @name getSingleFile
 * @description Get a single file from the bucket and gives you the URL to download it
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const getSingleFile = async (req, res) => {
  try {
    const { key } = req.params;
    const downloadURL = await getFileURL(key);
    responseSuccess(res, 200, `File ${key}`, downloadURL);
  } catch (error) {
    responseError(res, 500, error.message);
  }
};

/**
 * @name downloadSingleFile
 * @description Download a single file from the bucket
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const downloadSingleFile = async (req, res) => {
  try {
    const { key } = req.params;
    await downloadFile(key);
    responseSuccess(res, 200, `File ${key} downloaded`);
  } catch (error) {
    responseError(res, 500, error.message);
  }
};

/**
 * @name deleteSingleFile
 * @description Delete a single file from the bucket
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
export const deleteSingleFile = async (req, res) => {
  try {
    const { key } = req.params;
    await deleteFile(key);
    responseSuccess(res, 200, `File ${key} deleted`);
  } catch (error) {
    responseError(res, 500, error.message);
  }
};
