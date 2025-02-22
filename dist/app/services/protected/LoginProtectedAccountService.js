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
const ProtectedModel_1 = __importDefault(require("../../models/ProtectedModel"));
const createProtectedToken_1 = __importDefault(require("../../utils/createProtectedToken"));
const config_1 = __importDefault(require("../../config"));
const checkPassword_1 = __importDefault(require("../../utils/checkPassword"));
const LoginProtectedAccountService = (res, password, loginUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if protected account is already exists
        const protectedAccount = yield ProtectedModel_1.default.findOne({
            user: loginUserId,
        });
        if (!protectedAccount) {
            return res.status(409).json({
                success: false,
                message: "Protected Account doesn't exist",
            });
        }
        //check password
        const isPasswordMatch = yield (0, checkPassword_1.default)(password, protectedAccount.password); //return true or false
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password",
            });
        }
        //token-payload
        const tokenPayload = {
            userId: loginUserId,
        };
        const protectedToken = (0, createProtectedToken_1.default)(tokenPayload, config_1.default.jwt_protected_secret, config_1.default.jwt_protected_expires_in);
        res.status(200).json({
            success: true,
            message: "Protected Login successfully",
            data: {
                protectedToken,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
        });
    }
});
exports.default = LoginProtectedAccountService;
