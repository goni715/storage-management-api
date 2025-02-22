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
const ProtectedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.protectedtoken;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorized",
            error: {
                message: "Protected Token must be provided",
            },
        });
    }
    try {
        //token-verify
        const decoded = (0, verifyToken_1.default)(token, config_1.default.jwt_protected_secret);
        const { userId } = decoded;
        //set userId to headers
        req.headers.userId = userId;
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "You are not authorized associated with protected token",
            error: {
                message: err.message,
            },
        });
    }
});
exports.default = ProtectedMiddleware;
