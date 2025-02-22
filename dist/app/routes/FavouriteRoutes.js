"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const FavouriteController_1 = require("../controllers/FavouriteController");
const router = express_1.default.Router();
router.post('/create-or-remove-favourite', AuthMiddleware_1.default, FavouriteController_1.createRemoveFavourite);
router.get('/get-favourite-file-or-folder', AuthMiddleware_1.default, FavouriteController_1.getFavouriteFileOrFolder);
exports.default = router;
