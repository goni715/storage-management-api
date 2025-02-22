import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";
import { Types } from "mongoose";

const GetStorageSummaryService = async (res: Response, loginUserId: string) => {
  try {
    const ObjectId = Types.ObjectId;

    //1 KB = 1024 bytes
    //1 MB = 1024 KB
    //1 MB = 1024 × 1024 = 1048576 bytes

    //totalStorage = 1048576 * 100; //104857600 bytes
    const totalStorage = 100; // 100 MB

    const matchQuery = { user: new ObjectId(loginUserId) };

    // Aggregation pipeline to count documents and sum total size
    const result = await FileFolderModel.aggregate([
      { $match: matchQuery }, // Filter by user
      {
        $group: {
          _id: null,
          totalSize: { $sum: "$size" }, // Sum total size
        },
      },
    ]);

    // Extract results
    const usedStorage = (
      (result.length > 0 ? result[0].totalSize : 0) / 1048576
    ).toFixed(1); //converted to MB
    const dueStorage = (totalStorage - Number(usedStorage)).toFixed(1); //Converted to MB

    res.status(200).json({
      success: true,
      message: "Count and total size calculated successfully",
      data: {
        totalStorage: totalStorage+" MB",
        usedStorage: usedStorage+" MB",
        dueStorage: dueStorage+" MB",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default GetStorageSummaryService;
