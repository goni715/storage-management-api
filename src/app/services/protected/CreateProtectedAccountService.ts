import { Response } from "express";
import ProtectedModel from "../../models/ProtectedModel";

const CreateProtectedAccountService = async (res:Response, password: string, loginUserId: string) => {
    try {
      //check if protected account is already exists
      const protectedAccountExists = await ProtectedModel.findOne({ user: loginUserId });
      if (protectedAccountExists) {
        return res.status(409).json({
          success: false,
          message: "Protected Account is already exists",
        });
      }

    //create protected account
    const result = await ProtectedModel.create({
        user: loginUserId,
        password
    });

    res.status(201).json({
      success: true,
      message: "Protected Account is created successfully",
      data: result
    });


    }catch(err: any){
      res.status(500).json({
        success: false,
        message: "Something Went Wrong",
        error: err.message,
      });
    }
};

export default CreateProtectedAccountService;