"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../helper/upload"));
const FileController_1 = require("../controllers/FileController");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const router = express_1.default.Router();
router.post('/upload-file', AuthMiddleware_1.default, upload_1.default.single('file'), FileController_1.uploadFile);
//common routes both for file & folder
router.post('/duplicate-file-or-folder/:fileOrFolderId', AuthMiddleware_1.default, FileController_1.duplicateFileOrFolder);
router.put('/rename-file-or-folder', AuthMiddleware_1.default, FileController_1.renameFileOrFolder);
router.get('/filter-file-or-folder/:type', AuthMiddleware_1.default, FileController_1.filterFileOrFolder);
router.delete('/delete-file/:fileId', AuthMiddleware_1.default, FileController_1.deleteFile);
router.get('/get-file-and-folder-summary/:type', AuthMiddleware_1.default, FileController_1.getFileAndFolderSummary);
router.get('/get-storage-summary', AuthMiddleware_1.default, FileController_1.getStorageSummary);
exports.default = router;
