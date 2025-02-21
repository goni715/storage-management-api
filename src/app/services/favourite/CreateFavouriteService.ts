import { Response } from "express";
import { Types } from "mongoose";
import fs from "fs";
import FileFolderModel from "../../models/FileFolderModel";
import FavouriteModel from "../../models/FavouriteModel";

const CreateFavouriteService = async (
  res: Response,
  fileOrFolderId: string,
  loginUserId: string
) => {
  try {

    const ObjectId = Types.ObjectId;

    const data = await FileFolderModel.findOne({ user:loginUserId, _id: fileOrFolderId});
    if (!data) {
      return res.status(404).json({
        success: false,
        message: `This File or Folder doesn't exist`,
      });
    }

    const existingFavourite = await FavouriteModel.findOne({ 
        user: loginUserId, 
        fileOrFolder: fileOrFolderId 
      });
    
      //check existingFavourite
      if (existingFavourite) {
        // If exists, delete it
        await FavouriteModel.deleteOne({ _id: new ObjectId(existingFavourite._id) });
        return { message: "Removed from favourites" };
      } else {
        // If not, create a new one
        const newFavourite = await FavouriteModel.create({ user: loginUserId, fileOrFolder: fileOrFolderId });
        return newFavourite;
      }

    res.status(200).json({
      success: true,
      message: "File is deleted successfully",
      data: "result",
    });

    
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default CreateFavouriteService;
