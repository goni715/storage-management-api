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
const UserCreateService = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = payload;
    try {
        //check if email is already exists
        const emailExists = yield UserModel_1.default.findOne({ email });
        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: "Email is already exists",
            });
        }
        //check if username is already exists
        const usernameExists = yield UserModel_1.default.findOne({ username });
        if (usernameExists) {
            return res.status(409).json({
                success: false,
                message: "Username is already exists",
            });
        }
        //create user
        const result = yield UserModel_1.default.create(payload);
        res.status(201).json({
            success: true,
            message: "User is registered successfully",
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
exports.default = UserCreateService;
