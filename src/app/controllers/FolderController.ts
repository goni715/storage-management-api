import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
import FileFolderModel from "../models/FileFolderModel";
import CreateFolderService from "../services/folder/CreateFolderService";



// Create a folder
const createFolder = async (req: Request, res:Response) => {
  const loginUserId = req.headers.id;
  const { name } = req.body;
  await CreateFolderService(res, loginUserId as string, name);
};


// Get all folders
const getAllFolder = async (req:Request, res:Response) => {
  try {
    const folders = await FileFolderModel.find().populate("parent");
    res.status(200).json({
      success: true,
      message: "Folders are retrieved successfully",
      data: folders
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving folders", error });
  }
};



export {
    createFolder,
    getAllFolder
}