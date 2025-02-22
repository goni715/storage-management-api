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
exports.changeProtecteAccountPassword = exports.getProtectedFileOrFolder = exports.unprotectFileOrFolder = exports.protectFileOrFolder = exports.loginProtectedAccount = exports.createProtectedAccount = void 0;
const CreateProtectedAccountService_1 = __importDefault(require("../services/protected/CreateProtectedAccountService"));
const ProtectFileOrFolderService_1 = __importDefault(require("../services/protected/ProtectFileOrFolderService"));
const UnprotectFileOrFolderService_1 = __importDefault(require("../services/protected/UnprotectFileOrFolderService"));
const LoginProtectedAccountService_1 = __importDefault(require("../services/protected/LoginProtectedAccountService"));
const GetProtectedFileOrFolder_1 = __importDefault(require("../services/protected/GetProtectedFileOrFolder"));
const ChangeProtectedAccountPassService_1 = __importDefault(require("../services/protected/ChangeProtectedAccountPassService"));
const createProtectedAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    const { password } = req.body;
    yield (0, CreateProtectedAccountService_1.default)(res, password, loginUserId);
});
exports.createProtectedAccount = createProtectedAccount;
const loginProtectedAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const loginUserId = req.headers.id;
    yield (0, LoginProtectedAccountService_1.default)(res, password, loginUserId);
});
exports.loginProtectedAccount = loginProtectedAccount;
const protectFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileOrFolderId = req.params.fileOrFolderId;
    const loginUserId = req.headers.id;
    yield (0, ProtectFileOrFolderService_1.default)(res, fileOrFolderId, loginUserId);
});
exports.protectFileOrFolder = protectFileOrFolder;
const unprotectFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileOrFolderId = req.params.fileOrFolderId;
    const loginUserId = req.headers.id;
    yield (0, UnprotectFileOrFolderService_1.default)(res, fileOrFolderId, loginUserId);
});
exports.unprotectFileOrFolder = unprotectFileOrFolder;
const getProtectedFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    yield (0, GetProtectedFileOrFolder_1.default)(res, loginUserId);
});
exports.getProtectedFileOrFolder = getProtectedFileOrFolder;
const changeProtecteAccountPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    yield (0, ChangeProtectedAccountPassService_1.default)(res, loginUserId, req.body);
});
exports.changeProtecteAccountPassword = changeProtecteAccountPassword;
