import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";


const FilterFileOrFolderService = async (res:Response, type:string, loginUserId: string) => {
  try{
    
    const result = await FileFolderModel.find({ user:loginUserId, protected: false, type}).sort('-updatedAt');

    res.status(200).json({
      success: true,
      message: "File or Folder Filtered out successfully",
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

export default FilterFileOrFolderService;