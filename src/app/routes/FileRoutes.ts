import express from 'express';
import upload from '../helper/upload';
import { deleteFile,  duplicateFileOrFolder,  filterFByDate,  filterFileOrFolder, getFileAndFolderSummary, getStorageSummary, renameFileOrFolder, uploadFile } from '../controllers/FileController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();


router.post('/upload-file', AuthMiddleware, upload.single('file'), uploadFile);
//common routes both for file & folder
router.post('/duplicate-file-or-folder/:fileOrFolderId', AuthMiddleware, duplicateFileOrFolder);
router.put('/rename-file-or-folder', AuthMiddleware, renameFileOrFolder);
router.get('/filter-file-or-folder/:type', AuthMiddleware, filterFileOrFolder);

router.delete('/delete-file/:fileId', AuthMiddleware, deleteFile);
router.get('/get-file-and-folder-summary', AuthMiddleware, getFileAndFolderSummary);
router.get('/get-storage-summary', AuthMiddleware, getStorageSummary);
router.get('/filter-by-date/:date', AuthMiddleware, filterFByDate);



export default router;