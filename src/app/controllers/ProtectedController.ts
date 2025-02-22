import { Request, Response } from "express";
import CreateProtectedAccountService from "../services/protected/CreateProtectedAccountService";
import ProtectFileOrFolderService from "../services/protected/ProtectFileOrFolderService";
import UnprotectFileOrFolderService from "../services/protected/UnprotectFileOrFolderService";
import LoginProtectedAccountService from "../services/protected/LoginProtectedAccountService";

const createProtectedAccount = async (req: Request, res: Response) => {
  const loginUserId = req.headers.id;
  const { password } = req.body;
  await CreateProtectedAccountService(res, password, loginUserId as string);
};

const loginProtectedAccount = async (req: Request, res: Response) => {
  const { password } = req.body;
  const loginUserId = req.headers.id;
  await LoginProtectedAccountService(
    res,
    password,
    loginUserId as string
  );
};

const protectFileOrFolder = async (req: Request, res: Response) => {
  const fileOrFolderId = req.params.fileOrFolderId;
  const loginUserId = req.headers.id;
  await ProtectFileOrFolderService(res, fileOrFolderId, loginUserId as string);
};

const unprotectFileOrFolder = async (req: Request, res: Response) => {
  const fileOrFolderId = req.params.fileOrFolderId;
  const loginUserId = req.headers.id;
  await UnprotectFileOrFolderService(
    res,
    fileOrFolderId,
    loginUserId as string
  );
};

export { createProtectedAccount, loginProtectedAccount, protectFileOrFolder, unprotectFileOrFolder };
