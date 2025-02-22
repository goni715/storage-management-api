import { Response } from "express";
import ProtectedModel from "../../models/ProtectedModel";
import createProtectedToken, { TExpiresIn } from "../../utils/createProtectedToken";
import config from "../../config";
import checkPassword from "../../utils/checkPassword";


const LoginProtectedAccountService = async (res:Response, password: string, loginUserId: string) => {
  try{

    //check if protected account is already exists
    const protectedAccount = await ProtectedModel.findOne({
      user: loginUserId,
    });
    if (!protectedAccount) {
      return res.status(409).json({
        success: false,
        message: "Protected Account doesn't exist",
      });
    }


 //check password
 const isPasswordMatch: boolean = await checkPassword(
    password,
    protectedAccount.password
  ); //return true or false
  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "Wrong Password",
    });
  }

  //token-payload
  const tokenPayload = {
    userId: loginUserId,
  };

  const protectedToken = createProtectedToken(
    tokenPayload,
    config.jwt_protected_secret as string,
    config.jwt_protected_expires_in as TExpiresIn
  );


  res.status(200).json({
    success: true,
    message: "Protected Login successfully",
    data: {
      protectedToken,
    },
  });


  }catch(err:any){
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default LoginProtectedAccountService;