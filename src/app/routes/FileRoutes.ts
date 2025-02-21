import express from 'express';
import upload from '../helper/upload';
import { duplicateFile, uploadFile } from '../controllers/FileController';

const router = express.Router();

router.post('/upload-file', upload.single('file'), uploadFile);
router.post('/duplicate-file/:fileId', duplicateFile);



export default router;