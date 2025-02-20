import { Response } from "express";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import config from "../../config";
import { TLogin } from "../../interfaces/user.interface";

const UserLoginService = async (res: Response, payload: TLogin) => {
  const { email, password } = payload;

  try{

    //check if email does not exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Couldn't find this email address`,
      });
    }
     

    //check password
    const isPasswordMatch: boolean = await checkPassword(
      password,
      user?.password
    ); //return true or false
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }

    //token-payload
    const tokenPayload = {
      id: (user._id).toString(),
      email: user.email,
    };

    const accessToken = createToken(
      tokenPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as TExpiresIn
    );


    res.status(200).json({
      success: true,
      message: "User is Login successfully",
      data: {
        accessToken,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default UserLoginService;
