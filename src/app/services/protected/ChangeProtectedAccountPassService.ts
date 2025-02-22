import { Response } from "express";
import { TChangePass } from "../../interfaces/user.interface";
import checkPassword from "../../utils/checkPassword";
import hashedPassword from "../../utils/hashedPassword";
import { Types } from "mongoose";
import ProtectedModel from "../../models/ProtectedModel";

const ChangeProtectedAccountPassService = async (
  res: Response,
  loginUserId: string,
  payload: TChangePass
) => {
  const { oldPassword, newPassword } = payload;
  const ObjectId = Types.ObjectId;

  try {
    //check if the protected account is exist
    const data = await ProtectedModel.findOne({ user: loginUserId });

    if (!data) {
        return res.status(409).json({
          success: false,
          message: "Protected account doesn't exists",
        });
      }

    //checking if the password is not correct
    const isPasswordMatched = await checkPassword(
      oldPassword,
      data?.password as string
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
    await ProtectedModel.updateOne(
      { _id: new ObjectId(loginUserId) },
      { password: hashPass }
    );

    res.status(200).json({
        success: true,
        message: "Protected Account Password is updated successfully",
        data: null
      });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default ChangeProtectedAccountPassService;
