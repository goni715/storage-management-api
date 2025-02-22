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
const hashedPassword_1 = __importDefault(require("../../utils/hashedPassword"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const CreateNewPasswordService = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, password } = payload; //password=new password
    const statusUpdate = 1;
    try {
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
        const OtpExist = yield OtpModel_1.default.findOne({ email, otp, status: statusUpdate });
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
            status: statusUpdate,
            otpExpires: { $gt: new Date(Date.now()) },
        });
        if (!OtpExpired) {
            return res.status(400).json({
                success: false,
                message: "This OTP Code is expired",
            });
        }
        //Database Fourth Process
        //update the password
        const hashPass = yield (0, hashedPassword_1.default)(password); //hashedPassword
        yield UserModel_1.default.updateOne({ email: email }, { password: hashPass });
        res.status(200).json({ success: true, message: "Password is updated successfully", data: null });
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
exports.default = CreateNewPasswordService;
