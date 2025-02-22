import { NextFunction, Request, Response } from "express";
import verifyToken from "../utils/verifyToken";
import { Secret } from "jsonwebtoken";
import config from "../config";

const ProtectedMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.protectedtoken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
      error: {
        message: "Protected Token must be provided",
      },
    });
  }

  try {
    //token-verify
    const decoded = verifyToken(token as string, config.jwt_protected_secret as Secret);
    const { userId } = decoded;



    //set userId to headers
    req.headers.userId= userId;

    next();

  } catch (err:any) {
    res.status(401).json({
      success: false,
      message: "You are not authorized associated with protected token",
      error: {
        message: err.message,
      },
    });
  }
};

export default ProtectedMiddleware;
