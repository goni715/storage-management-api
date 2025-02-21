import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";

const GetRecentService = async (res:Response, loginUserId: string) => {
    try{
        const result = await FileFolderModel.find({ user: loginUserId, protected:false, }).sort('-updatedAt').limit(4);
        res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result
        });

    }
    catch(err:any){
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
          });
    }
};

export default GetRecentService;