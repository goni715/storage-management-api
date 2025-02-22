import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";
import { Types } from "mongoose";

const GetFileAndFolderSummaryService = async (res: Response, type: string, loginUserId: string) => {
  try {
    const ObjectId = Types.ObjectId;

    const matchQuery = { user: new ObjectId(loginUserId) };

    // Aggregation pipeline to count and sum size grouped by type
    const data = await FileFolderModel.aggregate([
      { $match: matchQuery }, // Filter by user
      {
        $group: {
          _id: "$type", // Group by type
          totalCount: { $sum: 1 }, // Count documents
          totalSize: { $sum: { $divide: ["$size", 1048576] } } // Convert total size from bytes to MB
        }
      }
    ]);

    const result = data?.map(({_id, totalCount, totalSize})=> ({
      type: _id,
      totalCount,
      totalSize: totalSize.toFixed(1)+" MB"
    }))


    res.status(200).json({
      success: true,
      message: "Count and total size calculated successfully",
      data: result
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};

export default GetFileAndFolderSummaryService;
