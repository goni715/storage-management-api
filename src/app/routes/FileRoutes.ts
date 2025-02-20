import express from 'express';
import upload from '../helper/upload';
import { uploadFile } from '../controllers/FileController';

const router = express.Router();

router.post('/upload-file', upload.single('file'), uploadFile);



export default router;