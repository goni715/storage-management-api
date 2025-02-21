import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";
import { Types } from "mongoose";


const UnprotectFileOrFolderService = async (res:Response, fileOrFolderId: string, loginUserId: string) => {
  try{
    const ObjectId = Types.ObjectId;
    const UpdateQuery = { _id: new ObjectId(fileOrFolderId), user: new ObjectId(loginUserId) };
    const result = await FileFolderModel.updateOne(UpdateQuery, {
        protected: false
    })

    res.status(200).json({
      success: true,
      message: "File or Folder is unprotected successfully",
      data: result,
    });

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default UnprotectFileOrFolderService;