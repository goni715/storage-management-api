import { Request, Response } from "express";
import CreateRemoveFavouriteService from "../services/favourite/CreateRemoveFavouriteService";
import GetFavouriteFileOrFolderService from "../services/favourite/GetFavouriteFileOrFolderService";


const createRemoveFavourite = async (req: Request, res: Response) => {
    const { fileOrFolderId } = req.body;
    const loginUserId = req.headers.id;
    await CreateRemoveFavouriteService(res, fileOrFolderId, loginUserId as string);
};

const getFavouriteFileOrFolder = async (req: Request, res: Response) => {
    const loginUserId = req.headers.id;
    await GetFavouriteFileOrFolderService(res, loginUserId as string);
};



export {
    createRemoveFavourite,
    getFavouriteFileOrFolder
}