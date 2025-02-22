"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FolderController_1 = require("../controllers/FolderController");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const router = express_1.default.Router();
router.post('/create-folder', AuthMiddleware_1.default, FolderController_1.createFolder);
router.get('/get-recent-file-folder', AuthMiddleware_1.default, FolderController_1.getRecentFileFolder);
router.delete('/delete-folder/:folderId', AuthMiddleware_1.default, FolderController_1.deleteFolder);
exports.default = router;
