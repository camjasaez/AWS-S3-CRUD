'use strict';
import { Router } from 'express';
import * as FilesController from '../controllers/files.controller.js';

const router = Router();

router.post('/', FilesController.createFile);
router.get('/', FilesController.listFiles);
router.get('/:key', FilesController.getSingleFile);
router.get('/download/:key', FilesController.downloadSingleFile);
router.delete('/:key', FilesController.deleteSingleFile);

export default router;
