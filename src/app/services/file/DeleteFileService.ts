import { Response } from "express";
import { Types } from "mongoose";
import fs from "fs";
import FileFolderModel from "../../models/FileFolderModel";

const DeleteFileService = async (
  res: Response,
  deleteId: string,
  loginUserId: string
) => {
  try {
    const ObjectId = Types.ObjectId;
    const DeleteQuery = {user:loginUserId, _id: new ObjectId(deleteId) };

    const file = await FileFolderModel.findOne({ user:loginUserId, _id: deleteId});
    if (!file) {
      return res.status(404).json({
        success: false,
        message: `This File doesn't exist`,
      });
    }

    
    //delete the file
    const result = await FileFolderModel.deleteOne(DeleteQuery);

    //check the file is not duplicated
    const duplicateFileExist = await FileFolderModel.findOne({ 
        user: loginUserId, 
        _id: { $ne: deleteId },
        path: file.path 
    });

    //if duplicate file doesn't exist
     //delete file from local machine
    if(!duplicateFileExist) {
        fs.unlinkSync(`uploads\\${file.filename}`);
    }

   


    res.status(200).json({
      success: true,
      message: "File is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default DeleteFileService;
