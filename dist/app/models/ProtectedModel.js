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
const mongoose_1 = require("mongoose");
const hashedPassword_1 = __importDefault(require("../utils/hashedPassword"));
const ProtectedSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    password: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});
//Hash Password before saving
ProtectedSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = this; //this means protected data
        // Only hash the password if it has been modified (or is new)
        if (!data.isModified("password"))
            return next();
        data.password = yield (0, hashedPassword_1.default)(data.password);
        next();
    });
});
const ProtectedModel = (0, mongoose_1.model)("Protected", ProtectedSchema);
exports.default = ProtectedModel;
