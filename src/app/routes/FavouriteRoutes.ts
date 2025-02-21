import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { createRemoveFavourite } from '../controllers/FavouriteController';

const router = express.Router();

router.post('/create-or-remove-favourite', AuthMiddleware, createRemoveFavourite);


export default router;