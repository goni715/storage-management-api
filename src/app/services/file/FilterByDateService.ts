import { Response } from "express";
import FileFolderModel from "../../models/FileFolderModel";
import { Types } from "mongoose";

const FilterByDateService = async (
  res: Response,
  loginUserId: string,
  date: string
) => {
  try {
    const from = `${date}T00:00:00.000+00:00`;
    const to = `${date}T23:59:59.999+00:00`;
    const ObjectId = Types.ObjectId;

    const result = await FileFolderModel.aggregate([
      {
        $match: {
          user: new ObjectId(loginUserId),
          createdAt: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200)
      .json({
        success: true,
        message: "Data retrieved successfully",
        data: result,
      });
      
  } catch (err: any) {
    res
      .status(500)
      .json({
        success: false,
        message: "Something Went Wrong",
        error: err.toString(),
      });
  }
};

export default FilterByDateService;
