import { Request, Response } from "express";
import FileModel from "../models/FileModel";


const uploadFile = async (req:Request, res: Response) => {
    try {
       
        if(!req.file){
           return res.status(404).json({
                success: false,
                message: "File not found"
            })
        }

        console.log(req.file);

        const file = new FileModel({
            name: req?.file.filename,
            path: req?.file.path,
            size: req?.file.size,
        });
     
        await file.save();

        res.status(201).json({success: true, message: 'File uploaded successfully', file });
        
    } catch (err:any) {
        res.status(500).json({ success: false, message: "Something Went Wrong", error: err.message });
    }
}


export {
    uploadFile
}