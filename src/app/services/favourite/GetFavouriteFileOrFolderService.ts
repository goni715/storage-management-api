import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";
import FavouriteModel from "../../models/FavouriteModel";

const GetFavouriteFileOrFolderService = async (res:Response, loginUserId: string) => {
    try{
        const result = await FavouriteModel.find({ user: loginUserId}).sort('-createdAt').populate('fileOrFolder');
        res.status(200).json({
          success: true,
          message: "Favourite File or Folder retrieved successfully",
          data: result
        });

    }
    catch(err:any){
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
          });
    }
};

export default GetFavouriteFileOrFolderService;