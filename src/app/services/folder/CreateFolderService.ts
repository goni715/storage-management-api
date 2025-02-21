import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";


const CreateFolderService = async (res:Response, loginUserId: string, name:string) => {
    try{
      //check name is already exists
      const nameExists = await FileFolderModel.findOne({ name });
      if (nameExists) {
        return res.status(409).json({
          success: false,
          message: "This Folder is already exists",
        });
      }

      const newData = {
        name,
        filename: "",
        path: "",
        type: "folder",
        size: 0,
        user: loginUserId,
      };

      const result = await FileFolderModel.create(newData);
      res
        .status(201)
        .json({
          success: true,
          message: "Folder is created successfully",
          data: result,
        });
    }catch(err:any){
        res
        .status(500)
        .json({
          success: false,
          message: "Something Went Wrong",
          error: err.message,
        });
    }
   
};

export default CreateFolderService;