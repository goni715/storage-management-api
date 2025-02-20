import { Request, RequestHandler, Response } from "express";
import UserCreateService from "../services/user/UserCreateService";
import UserLoginService from "../services/user/UserLoginService";


const register = async (req: Request, res: Response) => {
  await UserCreateService(res, req.body);
};


const login: RequestHandler = async (req, res) => {
    await UserLoginService(res, req.body);
}




export {
    register,
    login
}
