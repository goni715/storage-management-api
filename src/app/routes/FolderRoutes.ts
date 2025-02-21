import express from 'express';
import { createFolder, getAllFolder } from '../controllers/FolderController';

const router = express.Router();

router.post('/create-folder', createFolder);
router.get('/get-all-folder', getAllFolder);



export default router;