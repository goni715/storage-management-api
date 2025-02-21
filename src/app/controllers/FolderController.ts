import { Request, Response } from "express";
import CreateFolderService from "../services/folder/CreateFolderService";
import GetRecentService from "../services/folder/GetRecentService";
import DeleteFolderService from "../services/folder/DeleteFolderService";



// Create a folder
const createFolder = async (req: Request, res:Response) => {
  const loginUserId = req.headers.id;
  const { name } = req.body;
  await CreateFolderService(res, loginUserId as string, name);
};


// Get recent file folders
const getRecentFileFolder = async (req:Request, res:Response) => {
  const loginUserId = req.headers.id;
   await GetRecentService(res, loginUserId as string);
};

const deleteFolder = async (req: Request, res: Response) => {
  const deleteId = req.params.folderId;
  const loginUserId = req.headers.id;
  await DeleteFolderService(res, deleteId, loginUserId as string);
};



export {
    createFolder,
    getRecentFileFolder,
    deleteFolder
}