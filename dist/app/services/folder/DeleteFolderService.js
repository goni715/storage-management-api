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
const DeleteFolderService = (res, deleteId, loginUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const ObjectId = mongoose_1.Types.ObjectId;
    const DeleteQuery = {
        user: new ObjectId(loginUserId),
        _id: new ObjectId(deleteId),
    };
    const folder = yield FileFolderModel_1.default.findOne({
        user: loginUserId,
        _id: deleteId,
    });
    if (!folder) {
        return res.status(404).json({
            success: false,
            message: `This Folder doesn't exist`,
        });
    }
    //using transaction roll-back
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        //delete the folder
        const result = yield FileFolderModel_1.default.deleteOne(DeleteQuery, { session });
        //delete folder from favourite list
        yield FavouriteModel_1.default.deleteOne({ user: new ObjectId(loginUserId), fileOrFolder: new ObjectId(deleteId) }, { session });
        //transaction success
        yield session.commitTransaction();
        yield session.endSession();
        res.status(200).json({
            success: true,
            message: "Folder is deleted successfully",
            data: result,
        });
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
        });
    }
});
exports.default = DeleteFolderService;
