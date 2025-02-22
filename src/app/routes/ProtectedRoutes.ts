import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {
  createProtectedAccount,
  loginProtectedAccount,
  protectFileOrFolder,
  unprotectFileOrFolder,
} from "../controllers/ProtectedController";

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
  unprotectFileOrFolder
);

export default router;
