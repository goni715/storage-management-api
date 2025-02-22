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
const UnprotectFileOrFolderService = (res, fileOrFolderId, loginUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ObjectId = mongoose_1.Types.ObjectId;
        const UpdateQuery = { _id: new ObjectId(fileOrFolderId), user: new ObjectId(loginUserId) };
        const result = yield FileFolderModel_1.default.updateOne(UpdateQuery, {
            protected: false
        });
        res.status(200).json({
            success: true,
            message: "File or Folder is unprotected successfully",
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
exports.default = UnprotectFileOrFolderService;
