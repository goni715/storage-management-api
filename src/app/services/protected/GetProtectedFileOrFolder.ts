import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";


const GetProtectFileOrFolderService = async (res:Response,loginUserId: string) => {
  try{
    
    const result = await FileFolderModel.find({ user:loginUserId, protected: true}).sort('-updatedAt');

    res.status(200).json({
      success: true,
      message: "Protected File or Folder are retrieved successfully",
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

export default GetProtectFileOrFolderService;