import { Response } from "express";
import { IVerifyOTp } from "../../interfaces/otp.interface";
import OtpModel from "../../models/OtpModel";
import UserModel from "../../models/UserModel";

const ForgotPasswordVerifyOtpService = async (
  res: Response,
  payload: IVerifyOTp
) => {
  try {
    const { email, otp } = payload;
    const status = 0;
    const statusUpdate = 1;

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
    const OtpExist = await OtpModel.findOne({ email, otp, status });
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
      status,
      otpExpires: { $gt: new Date(Date.now()) },
    });

    if (!OtpExpired) {
      return res.status(400).json({
        success: false,
        message: "This OTP Code is expired",
      });
    }

    //Database Fourth Process
    //update the otp status
    const updateOtpStatus = await OtpModel.updateOne(
      { email, otp, status },
      { status: statusUpdate }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "OTP is verified successfully",
        data: null,
      });
  } catch (err: any) {
    res
      .status(500)
      .json({
        sucess: false,
        message: "Something Weng Wrong",
        data: err.toString(),
      });
  }
};

export default ForgotPasswordVerifyOtpService;
