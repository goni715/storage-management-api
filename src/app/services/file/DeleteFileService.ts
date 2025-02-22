import { Response } from "express";
import { startSession, Types } from "mongoose";
import fs from "fs";
import FileFolderModel from "../../models/FileFolderModel";
import FavouriteModel from "../../models/FavouriteModel";

const DeleteFileService = async (
  res: Response,
  deleteId: string,
  loginUserId: string
) => {

  const ObjectId = Types.ObjectId;
  const DeleteQuery = { user: loginUserId, _id: new ObjectId(deleteId) };

  const file = await FileFolderModel.findOne({
    user: loginUserId,
    _id: deleteId,
  });
  if (!file) {
    return res.status(404).json({
      success: false,
      message: `This File doesn't exist`,
    });
  }


    //using transaction roll-back
    const session = await startSession();
  try {
  
    session.startTransaction();

    //delete the file
    const result = await FileFolderModel.deleteOne(DeleteQuery, {session});

   

     //delete folder from favourite list
     await FavouriteModel.deleteOne(
      { user: new ObjectId(loginUserId), fileOrFolder: new ObjectId(deleteId) },
      { session }
    );

    //transaction success
    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
      message: "Folder is deleted successfully",
      data: result,
    });
    
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default DeleteFileService;
