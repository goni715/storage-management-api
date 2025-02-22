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
const FilterByDateService = (res, loginUserId, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const from = `${date}T00:00:00.000+00:00`;
        const to = `${date}T23:59:59.999+00:00`;
        const ObjectId = mongoose_1.Types.ObjectId;
        const result = yield FileFolderModel_1.default.aggregate([
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
    }
    catch (err) {
        res
            .status(500)
            .json({
            success: false,
            message: "Something Went Wrong",
            error: err.toString(),
        });
    }
});
exports.default = FilterByDateService;
