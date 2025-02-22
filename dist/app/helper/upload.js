"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    //comment-out for vercel server
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file.mimetype);
        console.log(file);
        let type = '';
        if (file.mimetype.split('/')[0] === "image") {
            type = "image";
        }
        if (file.originalname.split('.')[1] === "pdf") {
            type = "pdf";
        }
        if (file.mimetype.split('/')[0] !== "image" && file.originalname.split('.')[1] !== "pdf") {
            type = "note";
        }
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const uniqueSuffix = type + "_" + randomNumber + ".";
        const extension = file.originalname.split('.')[1];
        cb(null, uniqueSuffix + extension);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
