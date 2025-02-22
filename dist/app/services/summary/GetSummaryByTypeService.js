"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileFolderModel_1 = __importDefault(require("../../models/FileFolderModel"));
const mongoose_1 = require("mongoose");
const GetFileAndFolderSummaryService = (res, type, loginUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ObjectId = mongoose_1.Types.ObjectId;
        const matchQuery = { user: new ObjectId(loginUserId) };
        // Aggregation pipeline to count and sum size grouped by type
        const result = yield FileFolderModel_1.default.aggregate([
            { $match: matchQuery }, // Filter by user
            {
                $group: {
                    _id: "$type", // Group by type
                    totalCount: { $sum: 1 }, // Count documents
                    totalSize: { $sum: "$size" } // Sum total size
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Count and total size calculated successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
        });
    }
});
exports.default = GetFileAndFolderSummaryService;
