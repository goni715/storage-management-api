import express from 'express';
import upload from '../helper/upload';
import { deleteFile, duplicateFileFolder, renameFileFolder, uploadFile } from '../controllers/FileController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();


router.post('/upload-file', AuthMiddleware, upload.single('file'), uploadFile);
router.post('/duplicate-file-or-folder/:fileFolderId', AuthMiddleware, duplicateFileFolder);
router.put('/rename-file-or-folder', AuthMiddleware, renameFileFolder);
router.delete('/delete-file/:fileId', AuthMiddleware, deleteFile);



export default router;