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
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("../helper/cloudinary"));
const uploaToCloudinary = (path) => __awaiter(void 0, void 0, void 0, function* () {
    // Upload an image
    const uploadResult = yield cloudinary_1.default.uploader
        .upload(path, {
        folder: "storage-management"
    });
    fs_1.default.unlinkSync(path);
    return uploadResult;
});
exports.default = uploaToCloudinary;
