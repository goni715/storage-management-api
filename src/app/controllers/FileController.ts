import { Request, Response } from "express";
import FileModel from "../models/FileModel";


const uploadFile = async (req:Request, res: Response) => {

    try {
        if(req.file){

         console.log(req.file);

         const image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
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
         

         

            const file = new FileModel({
                name: req?.file.filename,
                path: image_url,
                type,
                size: req?.file.size,
            });
     
            await file.save();


            //"http://localhost:5000/uploads/1740068151907.jpeg"

            

        

            res.status(201).json({success: true, message: 'File uploaded successfully', file: image_url });

            
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


export {
    uploadFile
}