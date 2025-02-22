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
const FileFolderModel_1 = __importDefault(require("../../models/FileFolderModel"));
const FavouriteModel_1 = __importDefault(require("../../models/FavouriteModel"));
const CreateRemoveFavouriteService = (res, fileOrFolderId, loginUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ObjectId = mongoose_1.Types.ObjectId;
        const data = yield FileFolderModel_1.default.findOne({ user: loginUserId, _id: fileOrFolderId });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: `This File or Folder doesn't exist`,
            });
        }
        const existingFavourite = yield FavouriteModel_1.default.findOne({
            user: loginUserId,
            fileOrFolder: fileOrFolderId
        });
        //check existingFavourite
        if (existingFavourite) {
            // If exists, delete it
            const result = yield FavouriteModel_1.default.deleteOne({ _id: new ObjectId(existingFavourite._id) });
            res.status(200).json({
                success: true,
                message: "Favourite is removed successfully",
                data: result,
            });
        }
        else {
            // If not, create a new one
            const newFavourite = yield FavouriteModel_1.default.create({ user: loginUserId, fileOrFolder: fileOrFolderId });
            res.status(200).json({
                success: true,
                message: "Favourite is created successfully",
                data: newFavourite,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
        });
    }
});
exports.default = CreateRemoveFavouriteService;
