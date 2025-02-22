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
const hashedPassword_1 = __importDefault(require("../../utils/hashedPassword"));
const mongoose_1 = require("mongoose");
const ChangePasswordService = (res, loginUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const ObjectId = mongoose_1.Types.ObjectId;
    try {
        //check if the user is exist
        const user = yield UserModel_1.default.findById(loginUserId);
        //checking if the password is not correct
        const isPasswordMatched = yield (0, checkPassword_1.default)(oldPassword, user === null || user === void 0 ? void 0 : user.password); //return true or false
        if (!isPasswordMatched) {
            return res.status(409).json({
                success: false,
                message: "Old Password doesn't match",
            });
        }
        //hash the newPassword
        const hashPass = yield (0, hashedPassword_1.default)(newPassword);
        //update the password
        yield UserModel_1.default.updateOne({ _id: new ObjectId(loginUserId) }, { password: hashPass });
        res.status(200).json({
            success: true,
            message: "Password is updated successfully",
            data: null
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
exports.default = ChangePasswordService;
