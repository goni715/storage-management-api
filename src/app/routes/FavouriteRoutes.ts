import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { createRemoveFavourite, getFavouriteFileOrFolder } from '../controllers/FavouriteController';

const router = express.Router();

router.post('/create-or-remove-favourite', AuthMiddleware, createRemoveFavourite);
router.get('/get-favourite-file-or-folder', AuthMiddleware, getFavouriteFileOrFolder);


export default router;