import { Response } from "express";
import { INewPassword } from "../../interfaces/otp.interface";
import OtpModel from "../../models/OtpModel";
import hashedPassword from "../../utils/hashedPassword";
import UserModel from "../../models/UserModel";


const CreateNewPasswordService= async (res:Response, payload:INewPassword) => {

    const {email, otp, password} = payload; //password=new password
    const statusUpdate=1;

    try {

        //Database First Process
    //check if email does not exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Couldn't find this email address`,
      });
    }

       //Database second Process
    //check otp exist
    const OtpExist = await OtpModel.findOne({ email, otp, status: statusUpdate });
    if (!OtpExist) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP Code",
      });
    }


    
    //Database Third Process
    //check otp is expired
    const OtpExpired = await OtpModel.findOne({
        email,
        otp,
        status:statusUpdate,
        otpExpires: { $gt: new Date(Date.now()) },
      });


      if (!OtpExpired) {
        return res.status(400).json({
          success: false,
          message: "This OTP Code is expired",
        });
      }

     //Database Fourth Process
     //update the password
     const hashPass = await hashedPassword(password);//hashedPassword
     await UserModel.updateOne({email: email},{password: hashPass})
     res.status(200).json({success: true, message: "Password is updated successfully", data: null});

    }
    catch(err:any){
        res
      .status(500)
      .json({
        sucess: false,
        message: "Something Weng Wrong",
        data: err.toString(),
      });
    }
}


export default CreateNewPasswordService;