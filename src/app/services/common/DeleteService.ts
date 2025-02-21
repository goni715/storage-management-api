import { Response } from "express";
import { Model, Types } from "mongoose";
import fs from "fs";
import { IFileFolder } from "../../interfaces/fileFolder.interface";

const DeleteService = async (
  res: Response,
  deleteId: string,
  Model: Model<IFileFolder>
) => {
  try {
    const ObjectId = Types.ObjectId;
    const DeleteQuery = { _id: new ObjectId(deleteId) };

    const file = await Model.findById(deleteId);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: `This Id doesn't exist`,
      });
    }

    //delete the file
    const result = await Model.deleteOne(DeleteQuery);

    //delete file from local machine
    fs.unlinkSync(`uploads\\${file.filename}`);
    res.status(200).json({
      success: true,
      message: "Data is deleted successfully",
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

export default DeleteService;
