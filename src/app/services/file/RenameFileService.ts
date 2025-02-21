import { Response } from "express";
import { IRenameFile } from "../../interfaces/fileFolder.interface";
import FileModel from "../../models/FileFolderModel";
import { Types } from "mongoose";

const RenameFileService = async (res: Response, payload: IRenameFile) => {
  try {
    const { fileId, name } = payload;
    const ObjectId = Types.ObjectId;
    const file = await FileModel.findById(fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: `File doesn't exist`,
      });
    }

    console.log(payload);

    //rename the file
    const result = await FileModel.updateOne(
      { _id: new ObjectId(fileId) },
      { name }
    );
    res.status(200).json({
      success: true,
      message: "File is renamed successfully",
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

export default RenameFileService;
