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
const OtpModel_1 = __importDefault(require("../../models/OtpModel"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const ForgotPasswordVerifyOtpService = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = payload;
        const status = 0;
        const statusUpdate = 1;
        //Database First Process
        //check if email does not exist
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Couldn't find this email address`,
            });
        }
        //Database second Process
        //check otp exist
        const OtpExist = yield OtpModel_1.default.findOne({ email, otp, status });
        if (!OtpExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP Code",
            });
        }
        //Database Third Process
        //check otp is expired
        const OtpExpired = yield OtpModel_1.default.findOne({
            email,
            otp,
            status,
            otpExpires: { $gt: new Date(Date.now()) },
        });
        if (!OtpExpired) {
            return res.status(400).json({
                success: false,
                message: "This OTP Code is expired",
            });
        }
        //Database Fourth Process
        //update the otp status
        const updateOtpStatus = yield OtpModel_1.default.updateOne({ email, otp, status }, { status: statusUpdate });
        res
            .status(200)
            .json({
            success: true,
            message: "OTP is verified successfully",
            data: null,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            sucess: false,
            message: "Something Weng Wrong",
            data: err.toString(),
        });
    }
});
exports.default = ForgotPasswordVerifyOtpService;
