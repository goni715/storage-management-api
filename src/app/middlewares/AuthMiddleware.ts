import { NextFunction, Request, Response } from "express";
import verifyToken from "../utils/verifyToken";
import { Secret } from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/UserModel";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
      error: {
        message: "Token must be provided",
      },
    });
  }

  try {
    //token-verify
    const decoded = verifyToken(token as string, config.jwt_access_secret as Secret);
    const {id, email, iat} = decoded;

    //check if the user is exist
    const userExist = await UserModel.findById(id);
    if(!userExist){
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
        error: {
          message: "This User doesn't exist",
        },
      })
    }


    //set id & email to headers
    req.headers.email= email;
    req.headers.id= id;

    next();

  } catch (err:any) {
    res.status(401).json({
      success: false,
      message: "You are not authorized",
      error: {
        message: err.message,
      },
    });
  }
};

export default AuthMiddleware;
