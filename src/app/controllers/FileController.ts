import { Request, Response } from "express";
import FileFolderModel from "../models/FileFolderModel";
import DeleteFileService from "../services/file/DeleteFileService";
import DuplicateFileOrFolderService from "../services/file/DuplicateFileOrFolderService";
import RenameFileOrFolderService from "../services/file/RenameFileOrFolderService";
import FilterFileOrFolderService from "../services/file/FilterFileOrFolderService";


const uploadFile = async (req:Request, res: Response) => {
    const loginUserId = req.headers.id;

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
         
    

            const newFile = {
                name: req?.file.filename.split('.')[0],
                filename: req?.file.filename,
                path: path_url,
                type,
                size: req?.file.size,
                user: loginUserId
            };
     
             const result = await FileFolderModel.create(newFile)
            res.status(201).json({success: true, message: 'File uploaded successfully', data: result });
            
        }else{
             res.status(404).json({
                 success: false,
                 message: "Please Provide a file"
             })
        }   
    } catch (err:any) {
        res.status(500).json({ success: false, message: "Something Went Wrong", error: err.message });
    }
}


//common controller function for both file & folder
//RenameFileFolderService is located at file directory inside the services folder
const duplicateFileOrFolder = async (req:Request, res: Response) => {
    const loginUserId = req.headers.id;
    const fileOrFolderId = req.params.fileOrFolderId;
    await DuplicateFileOrFolderService(res, fileOrFolderId, loginUserId as string);
}

//common controller function for both file & folder
//RenameFileFolderService is located at file directory inside the services folder
const renameFileOrFolder = async (req: Request, res: Response) => {
    const loginUserId = req.headers.id;
    await RenameFileOrFolderService(res, req.body, loginUserId as string);
};
  
const deleteFile = async (req: Request, res: Response) => {
    const deleteId = req.params.fileId;
    const loginUserId = req.headers.id;
    await DeleteFileService(res, deleteId, loginUserId as string);
};
  

//common controller function for both file & folder
//FilterFileFolderService is located at file directory inside the services folder
const filterFileOrFolder = async (req: Request, res: Response) => {
    const type = req.params.type;
    const loginUserId = req.headers.id;
    await FilterFileOrFolderService(res, type, loginUserId as string);
};

export {
    uploadFile,
    duplicateFileOrFolder,
    renameFileOrFolder,
    deleteFile,
    filterFileOrFolder
}