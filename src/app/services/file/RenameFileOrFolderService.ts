import { Response } from "express";
import { IRenameFile } from "../../interfaces/fileFolder.interface";
import FileFolderModel from "../../models/FileFolderModel";
import { Types } from "mongoose";

const RenameFileOrFolderService = async (res: Response, payload: IRenameFile, loginUserId:string) => {
  try {
    const { fileOrFolderId, name } = payload;
    const ObjectId = Types.ObjectId;
    const data = await FileFolderModel.findOne({ user:loginUserId, _id: fileOrFolderId});

    if (!data) {
      return res.status(404).json({
        success: false,
        message: `Data doesn't exist with this id`,
      });
    }


    //rename the file
    const result = await FileFolderModel.updateOne(
      { _id: new ObjectId(fileOrFolderId) },
      { name }
    );
    res.status(200).json({
      success: true,
      message: "File or Folder is renamed successfully",
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

export default RenameFileOrFolderService;
