import { Request, RequestHandler, Response } from "express";
import UserCreateService from "../services/user/UserCreateService";
import UserLoginService from "../services/user/UserLoginService";
import ForgotPasswordVerifyEmailService from "../services/ForgotPassword/ForgotPasswordVerifyEmailService";
import ForgotPasswordVerifyOtpService from "../services/ForgotPassword/ForgotPasswordVerifyOtpService";


const register = async (req: Request, res: Response) => {
  await UserCreateService(res, req.body);
};


const login: RequestHandler = async (req, res) => {
    await UserLoginService(res, req.body);
}

//step-01
const forgotPasswordVerifyEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  await ForgotPasswordVerifyEmailService(res, email);
};

//step-01
const forgotPasswordVerifyOtp = async (req: Request, res: Response) => {
  await ForgotPasswordVerifyOtpService(res, req.body);
};



export {
    register,
    login,
    forgotPasswordVerifyEmail,
    forgotPasswordVerifyOtp
}
