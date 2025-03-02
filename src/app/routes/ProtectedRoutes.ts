import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {
  changeProtecteAccountPassword,
  createProtectedAccount,
  getProtectedFileOrFolder,
  loginProtectedAccount,
  protectFileOrFolder,
  unprotectFileOrFolder,
} from "../controllers/ProtectedController";
import ProtectedMiddleware from "../middlewares/ProtectedMiddleware";

const router = express.Router();

router.post(
  "/create-protected-account",
  AuthMiddleware,
  createProtectedAccount
);
router.post("/login-protected-account", AuthMiddleware, loginProtectedAccount);
router.put(
  "/protect-file-or-folder/:fileOrFolderId",
  AuthMiddleware,
  protectFileOrFolder
);
router.put(
  "/unprotect-file-or-folder/:fileOrFolderId",
  AuthMiddleware,
  ProtectedMiddleware,
  unprotectFileOrFolder
);

router.get('/get-protected-file-or-folder', AuthMiddleware, ProtectedMiddleware, getProtectedFileOrFolder);
router.put('/change-protected-account-password', AuthMiddleware, changeProtecteAccountPassword);


export default router;
