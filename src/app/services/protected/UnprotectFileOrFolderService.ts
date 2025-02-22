import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";
import { Types } from "mongoose";


const UnprotectFileOrFolderService = async (res:Response, fileOrFolderId: string, loginUserId: string) => {
  try{
    const ObjectId = Types.ObjectId;
    const data = await FileFolderModel.findOne({
      user: loginUserId,
      _id: fileOrFolderId,
    });
    if (!data) {
      return res.status(404).json({
        success: false,
        message: `This File or Folder doesn't exist`,
      });
    }
    
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