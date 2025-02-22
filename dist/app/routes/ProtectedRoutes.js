"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const ProtectedController_1 = require("../controllers/ProtectedController");
const ProtectedMiddleware_1 = __importDefault(require("../middlewares/ProtectedMiddleware"));
const router = express_1.default.Router();
router.post("/create-protected-account", AuthMiddleware_1.default, ProtectedController_1.createProtectedAccount);
router.post("/login-protected-account", AuthMiddleware_1.default, ProtectedController_1.loginProtectedAccount);
router.put("/protect-file-or-folder/:fileOrFolderId", AuthMiddleware_1.default, ProtectedController_1.protectFileOrFolder);
router.put("/unprotect-file-or-folder/:fileOrFolderId", AuthMiddleware_1.default, ProtectedMiddleware_1.default, ProtectedController_1.unprotectFileOrFolder);
router.get('/get-protected-file-or-folder', AuthMiddleware_1.default, ProtectedMiddleware_1.default, ProtectedController_1.getProtectedFileOrFolder);
router.put('/change-protected-account-password', AuthMiddleware_1.default, ProtectedController_1.changeProtecteAccountPassword);
exports.default = router;
