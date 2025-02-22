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
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const checkPassword_1 = __importDefault(require("../../utils/checkPassword"));
const createToken_1 = __importDefault(require("../../utils/createToken"));
const config_1 = __importDefault(require("../../config"));
const UserLoginService = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    try {
        //check if email does not exist
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Couldn't find this email address`,
            });
        }
        //check password
        const isPasswordMatch = yield (0, checkPassword_1.default)(password, user === null || user === void 0 ? void 0 : user.password); //return true or false
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password",
            });
        }
        //token-payload
        const tokenPayload = {
            id: (user._id).toString(),
            email: user.email,
        };
        const accessToken = (0, createToken_1.default)(tokenPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        res.status(200).json({
            success: true,
            message: "User is Login successfully",
            data: {
                accessToken,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
exports.default = UserLoginService;
