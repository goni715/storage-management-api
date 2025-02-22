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
const OtpModel_1 = __importDefault(require("../../models/OtpModel"));
const SendEmailUtility_1 = __importDefault(require("../../utils/SendEmailUtility"));
const ForgotPasswordVerifyEmailService = (res, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OtpCode = Math.floor(100000 + Math.random() * 900000);
        // Database First process
        //check if email does not exist
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Couldn't find this email address`,
            });
        }
        // OTP Insert
        // Database Second process
        yield OtpModel_1.default.create({ email: email, otp: OtpCode });
        // Email Send
        const result = yield (0, SendEmailUtility_1.default)(email, String(OtpCode));
        res.status(200).json({
            sucess: true,
            message: "We have sent you a 6 digit verification code",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({ sucess: false, message: "Something Weng Wrong", data: err.toString() });
    }
});
exports.default = ForgotPasswordVerifyEmailService;
