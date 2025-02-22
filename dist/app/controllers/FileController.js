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
exports.getStorageSummary = exports.getFileAndFolderSummary = exports.filterFileOrFolder = exports.deleteFile = exports.renameFileOrFolder = exports.duplicateFileOrFolder = exports.uploadFile = void 0;
const FileFolderModel_1 = __importDefault(require("../models/FileFolderModel"));
const DeleteFileService_1 = __importDefault(require("../services/file/DeleteFileService"));
const DuplicateFileOrFolderService_1 = __importDefault(require("../services/file/DuplicateFileOrFolderService"));
const RenameFileOrFolderService_1 = __importDefault(require("../services/file/RenameFileOrFolderService"));
const FilterFileOrFolderService_1 = __importDefault(require("../services/file/FilterFileOrFolderService"));
const GetFileSummaryByTypeService_1 = __importDefault(require("../services/summary/GetFileSummaryByTypeService"));
const GetStorageSummaryService_1 = __importDefault(require("../services/summary/GetStorageSummaryService"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    try {
        if (req.file) {
            const path_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; //for local machine
            let type = '';
            if (req.file.mimetype.split('/')[0] === "image") {
                type = "image";
            }
            if (req.file.originalname.split('.')[1] === "pdf") {
                type = "pdf";
            }
            if (req.file.mimetype.split('/')[0] !== "image" && req.file.originalname.split('.')[1] !== "pdf") {
                type = "note";
            }
            //file upload to cloudinary
            // const cloudinaryRes = await uploaToCloudinary(req.file?.path);
            // console.log(cloudinaryRes);
            //insert to database
            const newFile = {
                name: req === null || req === void 0 ? void 0 : req.file.filename.split('.')[0],
                filename: req === null || req === void 0 ? void 0 : req.file.filename,
                path: path_url, //or path_url
                type,
                size: req === null || req === void 0 ? void 0 : req.file.size,
                user: loginUserId
            };
            const result = yield FileFolderModel_1.default.create(newFile);
            res.status(201).json({ success: true, message: 'File uploaded successfully', data: result });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Please Provide a file"
            });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Something Went Wrong", error: err.message });
    }
});
exports.uploadFile = uploadFile;
//common controller function for both file & folder
//RenameFileFolderService is located at file directory inside the services folder
const duplicateFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    const fileOrFolderId = req.params.fileOrFolderId;
    yield (0, DuplicateFileOrFolderService_1.default)(res, fileOrFolderId, loginUserId);
});
exports.duplicateFileOrFolder = duplicateFileOrFolder;
//common controller function for both file & folder
//RenameFileFolderService is located at file directory inside the services folder
const renameFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    yield (0, RenameFileOrFolderService_1.default)(res, req.body, loginUserId);
});
exports.renameFileOrFolder = renameFileOrFolder;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteId = req.params.fileId;
    const loginUserId = req.headers.id;
    yield (0, DeleteFileService_1.default)(res, deleteId, loginUserId);
});
exports.deleteFile = deleteFile;
//common controller function for both file & folder
//FilterFileFolderService is located at file directory inside the services folder
const filterFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const loginUserId = req.headers.id;
    yield (0, FilterFileOrFolderService_1.default)(res, type, loginUserId);
});
exports.filterFileOrFolder = filterFileOrFolder;
//common controller function for both file & folder
const getFileAndFolderSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const loginUserId = req.headers.id;
    yield (0, GetFileSummaryByTypeService_1.default)(res, type, loginUserId);
});
exports.getFileAndFolderSummary = getFileAndFolderSummary;
//getstorage summary
const getStorageSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    yield (0, GetStorageSummaryService_1.default)(res, loginUserId);
});
exports.getStorageSummary = getStorageSummary;
