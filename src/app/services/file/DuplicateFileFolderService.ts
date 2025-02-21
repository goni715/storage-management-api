import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";

const DuplicateFileFolderService = async (res: Response, fileFolderId: string, loginUserId:string) => {
  try {
    const data = await FileFolderModel.findOne({ user:loginUserId, _id: fileFolderId});
    if (!data) {
      return res.status(404).json({
        success: false,
        message: `Data doesn't exist`,
      });
    }

    //create a copy file
    const newFile = {
      name: `${data.name}-Copy`,
      path: data.path,
      type: data.type,
      size: data.size,
      user: loginUserId
    };

    const result = await FileFolderModel.create(newFile);

    res
      .status(200)
      .json({
        success: true,
        message: "File or Folder is Duplicated successfully",
        data: result,
      });
  } catch (err: any) {
    res
      .status(500)
      .json({
        success: false,
        message: "Something Went Wrong",
        error: err.message,
      });
  }
};

export default DuplicateFileFolderService;
