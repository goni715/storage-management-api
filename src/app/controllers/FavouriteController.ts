import { Request, Response } from "express";
import CreateRemoveFavouriteService from "../services/favourite/CreateFavouriteService";


const createRemoveFavourite = async (req: Request, res: Response) => {
    const { fileOrFolderId } = req.body;
    const loginUserId = req.headers.id;
    await CreateRemoveFavouriteService(res, fileOrFolderId, loginUserId as string);
};



export {
    createRemoveFavourite
}