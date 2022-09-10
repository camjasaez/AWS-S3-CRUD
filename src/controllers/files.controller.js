import {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  getFileURL,
} from '../services/db/aws.services.js';

export const createFile = async (req, res) => {
  const { file } = req.files;
  const response = await uploadFile(file);
  res.json({ message: `File ${file.name} uploaded`, response });
};

export const listFiles = async (req, res) => {
  const { Contents } = await getFiles();
  res.json({ message: `The list of objects`, response: Contents });
};

export const getSingleFile = async (req, res) => {
  const { key } = req.params;
  const downloadURL = await getFileURL(key);
  const { $metadata } = await getFile(key);
  res.json({ message: `File ${key}`, data: $metadata, downloadURL });
};

export const downloadSingleFile = async (req, res) => {
  const { key } = req.params;
  await downloadFile(key);
  res.json({ message: `File ${key} downloaded` });
};
