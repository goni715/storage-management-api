import { Response } from "express";
import { IUser } from "../../interfaces/user.interface";
import UserModel from "../../models/UserModel";

const UserCreateService = async (res: Response, payload: IUser) => {
  const { email, username } = payload;

  try {
    //check if email is already exists
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email is already exists",
      });
    }

    //check if username is already exists
    const usernameExists = await UserModel.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({
        success: false,
        message: "Username is already exists",
      });
    }

    //create user
    const result = await UserModel.create(payload);
    res.status(201).json({
      success: true,
      message: "User is registered successfully",
      data: null
    });

  }catch(err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default UserCreateService;
