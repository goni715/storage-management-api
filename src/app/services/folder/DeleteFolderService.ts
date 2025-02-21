import { Response } from "express";
import { Types } from "mongoose";
import FileFolderModel from "../../models/FileFolderModel";

const DeleteFolderService = async (
  res: Response,
  deleteId: string,
  loginUserId: string
) => {
  try {
    const ObjectId = Types.ObjectId;
    const DeleteQuery = {user:loginUserId, _id: new ObjectId(deleteId) };

    const folder = await FileFolderModel.findOne({ user:loginUserId, _id: deleteId});
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: `This Folder doesn't exist`,
      });
    }


    //delete the folder
    const result = await FileFolderModel.deleteOne(DeleteQuery);

    res.status(200).json({
      success: true,
      message: "Folder is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default DeleteFolderService;
