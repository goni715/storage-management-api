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
exports.getFavouriteFileOrFolder = exports.createRemoveFavourite = void 0;
const CreateRemoveFavouriteService_1 = __importDefault(require("../services/favourite/CreateRemoveFavouriteService"));
const GetFavouriteFileOrFolderService_1 = __importDefault(require("../services/favourite/GetFavouriteFileOrFolderService"));
const createRemoveFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileOrFolderId } = req.body;
    const loginUserId = req.headers.id;
    yield (0, CreateRemoveFavouriteService_1.default)(res, fileOrFolderId, loginUserId);
});
exports.createRemoveFavourite = createRemoveFavourite;
const getFavouriteFileOrFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    yield (0, GetFavouriteFileOrFolderService_1.default)(res, loginUserId);
});
exports.getFavouriteFileOrFolder = getFavouriteFileOrFolder;
