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
const mongoose_1 = require("mongoose");
const fs_1 = __importDefault(require("fs"));
const FileFolderModel_1 = __importDefault(require("../../models/FileFolderModel"));
const DeleteFileService = (res, deleteId, loginUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ObjectId = mongoose_1.Types.ObjectId;
        const DeleteQuery = { user: loginUserId, _id: new ObjectId(deleteId) };
        const file = yield FileFolderModel_1.default.findOne({ user: loginUserId, _id: deleteId });
        if (!file) {
            return res.status(404).json({
                success: false,
                message: `This File doesn't exist`,
            });
        }
        //delete the file
        const result = yield FileFolderModel_1.default.deleteOne(DeleteQuery);
        //check the file is not duplicated
        const duplicateFileExist = yield FileFolderModel_1.default.findOne({
            user: loginUserId,
            _id: { $ne: deleteId },
            path: file.path
        });
        //if duplicate file doesn't exist
        //delete file from local machine
        if (!duplicateFileExist) {
            fs_1.default.unlinkSync(`uploads\\${file.filename}`);
        }
        res.status(200).json({
            success: true,
            message: "File is deleted successfully",
            data: result,
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
exports.default = DeleteFileService;
