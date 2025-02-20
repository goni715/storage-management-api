import express from 'express';
import { createFolder } from '../controllers/FolderController';

const router = express.Router();

router.post('/create-folder', createFolder);




export default router;