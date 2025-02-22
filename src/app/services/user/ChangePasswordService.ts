import { Response } from "express";
import { TChangePass } from "../../interfaces/user.interface";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import hashedPassword from "../../utils/hashedPassword";
import { Types } from "mongoose";

const ChangePasswordService = async (
  res: Response,
  loginUserId: string,
  payload: TChangePass
) => {
  const { oldPassword, newPassword } = payload;
  const ObjectId = Types.ObjectId;

  try {
    //check if the user is exist
    const user = await UserModel.findById(loginUserId);

    //checking if the password is not correct
    const isPasswordMatched = await checkPassword(
      oldPassword,
      user?.password as string
    ); //return true or false

    if (!isPasswordMatched) {
      return res.status(409).json({
        success: false,
        message: "Old Password doesn't match",
      });
    }

    //hash the newPassword
    const hashPass = await hashedPassword(newPassword);

    //update the password
    await UserModel.updateOne(
      { _id: new ObjectId(loginUserId) },
      { password: hashPass }
    );

    res.status(200).json({
        success: true,
        message: "Password is updated successfully",
        data: null
      });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default ChangePasswordService;
