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
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const config_1 = __importDefault(require("../config"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorized",
            error: {
                message: "Token must be provided",
            },
        });
    }
    try {
        //token-verify
        const decoded = (0, verifyToken_1.default)(token, config_1.default.jwt_access_secret);
        const { id, email, iat } = decoded;
        //check if the user is exist
        const userExist = yield UserModel_1.default.findById(id);
        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized",
                error: {
                    message: "This User doesn't exist",
                },
            });
        }
        //set id & email to headers
        req.headers.email = email;
        req.headers.id = id;
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "You are not authorized",
            error: {
                message: err.message,
            },
        });
    }
});
exports.default = AuthMiddleware;
