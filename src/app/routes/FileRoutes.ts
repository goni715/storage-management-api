import express from 'express';
import upload from '../helper/upload';
import { deleteFile,  duplicateFileOrFolder,  filterFileOrFolder,  renameFileOrFolder,  uploadFile } from '../controllers/FileController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();


router.post('/upload-file', AuthMiddleware, upload.single('file'), uploadFile);
//common routes both for file & folder
router.post('/duplicate-file-or-folder/:fileOrFolderId', AuthMiddleware, duplicateFileOrFolder);
router.put('/rename-file-or-folder', AuthMiddleware, renameFileOrFolder);
router.get('/filter-file-or-folder/:type', AuthMiddleware, filterFileOrFolder);

router.delete('/delete-file/:fileId', AuthMiddleware, deleteFile);



export default router;