import express from 'express';
import upload from '../helper/upload';
import { deleteFile,  uploadFile } from '../controllers/FileController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();


router.post('/upload-file', AuthMiddleware, upload.single('file'), uploadFile);
router.post('/duplicate-file-or-folder/:fileOrFolderId', AuthMiddleware, duplicateFileOrFolder);
router.put('/rename-file-or-folder', AuthMiddleware, renameFileOrFolder);
router.delete('/delete-file/:fileId', AuthMiddleware, deleteFile);



export default router;