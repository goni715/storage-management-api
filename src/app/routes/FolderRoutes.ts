import express from 'express';
import { createFolder, deleteFolder, getRecentFileFolder } from '../controllers/FolderController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

router.post('/create-folder', AuthMiddleware, createFolder);
router.get('/get-recent-file-folder', AuthMiddleware, getRecentFileFolder);
router.delete('/delete-folder/:folderId', AuthMiddleware, deleteFolder);



export default router;