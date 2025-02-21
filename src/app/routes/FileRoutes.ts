import express from 'express';
import upload from '../helper/upload';
import { deleteFile, duplicateFile, renameFile, uploadFile } from '../controllers/FileController';

const router = express.Router();


router.post('/upload-file', upload.single('file'), uploadFile);
router.post('/duplicate-file/:fileId', duplicateFile);
router.put('/rename-file', renameFile);
router.delete('/delete-file/:fileId', deleteFile);



export default router;