import { Response } from "express";
import UserModel from "../../models/UserModel";
import OtpModel from "../../models/OtpModel";
import SendEmailUtility from "../../utils/SendEmailUtility";

const ForgotPasswordVerifyEmailService = async (
  res: Response,
  email: string
) => {
  try {
    const OtpCode = Math.floor(100000 + Math.random() * 900000);

    // Database First process
    //check if email does not exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Couldn't find this email address`,
      });
    }

    // OTP Insert
    // Database Second process
    await OtpModel.create({ email: email, otp: OtpCode });

    // Email Send
    const result = await SendEmailUtility(email, String(OtpCode));
    res.status(200).json({
      sucess: true,
      message: "We have sent you a 6 digit verification code",
      data:result
    });
  } catch (err: any) {
    res.status(500).json({ sucess: false, message: "Something Weng Wrong", data: err.toString() });
  }
};


export default ForgotPasswordVerifyEmailService;
