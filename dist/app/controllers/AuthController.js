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
exports.changePassword = exports.createNewPassword = exports.forgotPasswordVerifyOtp = exports.forgotPasswordVerifyEmail = exports.login = exports.register = void 0;
const UserCreateService_1 = __importDefault(require("../services/user/UserCreateService"));
const UserLoginService_1 = __importDefault(require("../services/user/UserLoginService"));
const ForgotPasswordVerifyEmailService_1 = __importDefault(require("../services/ForgotPassword/ForgotPasswordVerifyEmailService"));
const ForgotPasswordVerifyOtpService_1 = __importDefault(require("../services/ForgotPassword/ForgotPasswordVerifyOtpService"));
const CreateNewPasswordService_1 = __importDefault(require("../services/ForgotPassword/CreateNewPasswordService"));
const ChangePasswordService_1 = __importDefault(require("../services/user/ChangePasswordService"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserCreateService_1.default)(res, req.body);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserLoginService_1.default)(res, req.body);
});
exports.login = login;
//step-01
const forgotPasswordVerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, ForgotPasswordVerifyEmailService_1.default)(res, email);
});
exports.forgotPasswordVerifyEmail = forgotPasswordVerifyEmail;
//step-02
const forgotPasswordVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ForgotPasswordVerifyOtpService_1.default)(res, req.body);
});
exports.forgotPasswordVerifyOtp = forgotPasswordVerifyOtp;
//step-03
const createNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CreateNewPasswordService_1.default)(res, req.body);
});
exports.createNewPassword = createNewPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserId = req.headers.id;
    yield (0, ChangePasswordService_1.default)(res, loginUserId, req.body);
});
exports.changePassword = changePassword;
