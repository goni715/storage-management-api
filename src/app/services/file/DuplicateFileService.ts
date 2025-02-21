import { Response } from "express";
import FileModel from "../../models/FileModel";

const DuplicateFileService = async (res: Response, fileId:string) => {
   try{
    const file = await FileModel.findById(fileId);
    if (!file) {
        return res.status(404).json({
          success: false,
          message: `File doesn't exist`,
        });
    }

    //create a copy file
    const newFile = {
        name: `${file.name}-Copy`,
        path: file.path,
        type: file.type,
        size: file.size
    }

    const result = await FileModel.create(newFile);

    res.status(200).json({success: true, message: 'File is copied successfully', data: result });

   }
   catch(err:any){
    res.status(500).json({ success: false, message: "Something Went Wrong", error: err.message });
   }
};

export default DuplicateFileService;