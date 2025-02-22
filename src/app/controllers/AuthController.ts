import { Request, RequestHandler, Response } from "express";
import UserCreateService from "../services/user/UserCreateService";
import UserLoginService from "../services/user/UserLoginService";
import ForgotPasswordVerifyEmailService from "../services/ForgotPassword/ForgotPasswordVerifyEmailService";
import ForgotPasswordVerifyOtpService from "../services/ForgotPassword/ForgotPasswordVerifyOtpService";
import CreateNewPasswordService from "../services/ForgotPassword/CreateNewPasswordService";
import ChangePasswordService from "../services/user/ChangePasswordService";


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

//step-02
const forgotPasswordVerifyOtp = async (req: Request, res: Response) => {
  await ForgotPasswordVerifyOtpService(res, req.body);
};

//step-03
const createNewPassword = async (req: Request, res: Response) => {
  await CreateNewPasswordService(res, req.body);
};



const changePassword = async (req: Request, res: Response) => {
  const loginUserId = req.headers.id;
  await ChangePasswordService(res, loginUserId as string, req.body);
};


export {
    register,
    login,
    forgotPasswordVerifyEmail,
    forgotPasswordVerifyOtp,
    createNewPassword,
    changePassword
}
