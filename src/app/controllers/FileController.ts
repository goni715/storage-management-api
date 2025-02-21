import { Request, Response } from "express";
import DuplicateFileService from "../services/file/DuplicateFileService";
import RenameFileService from "../services/file/RenameFileService";
import DeleteService from "../services/common/DeleteService";
import FileFolderModel from "../models/FileFolderModel";


const uploadFile = async (req:Request, res: Response) => {

    try {
        if(req.file){

         console.log(req.file);

         const path_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
         let type: string='';
         if(req.file.mimetype.split('/')[0] === "image"){
            type="image"
         }

         if(req.file.mimetype.split('/')[0] !== "image" && req.file.originalname.split('.')[1] === "pdf"){
            type="pdf"
         }

         if(req.file.mimetype.split('/')[0] !== "image" && req.file.originalname.split('.')[1] !== "pdf"){
            type="note"
         }
         

         

            const file = new FileFolderModel({
                name: req?.file.filename.split('.')[0],
                filename: req?.file.filename,
                path: path_url,
                type,
                size: req?.file.size,
            });
     
            await file.save();


            res.status(201).json({success: true, message: 'File uploaded successfully', file: path_url });
            
        }else{
             res.status(404).json({
                 success: false,
                 message: "File not found"
             })
        }

      
        
    } catch (err:any) {
        res.status(500).json({ success: false, message: "Something Went Wrong", error: err.message });
    }
}


const duplicateFile = async (req:Request, res: Response) => {
    const fileId = req.params.fileId;
    await DuplicateFileService(res, fileId);
}

const renameFile = async (req: Request, res: Response) => {
    await RenameFileService(res, req.body);
};
  
const deleteFile = async (req: Request, res: Response) => {
    const deleteId = req.params.fileId;
    await DeleteService(res, deleteId, FileFolderModel);
};
  

export {
    uploadFile,
    duplicateFile,
    renameFile,
    deleteFile
}