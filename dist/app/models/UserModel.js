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
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Regex to validate username
                // This example allows alphanumeric characters, underscores, and hyphens
                // Username must be between 3 and 20 characters long
                return /^[a-zA-Z0-9_-]{3,20}$/.test(v);
            },
            message: `Invalid username, Only alphameric characters, underscores and hypens are allowed. No space are permitted. 20 characters long`,
        },
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email",
        },
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
//Hash Password before saving
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; //this means user
        // Only hash the password if it has been modified (or is new)
        if (!user.isModified("password"))
            return next();
        user.password = yield (0, hashedPassword_1.default)(user.password);
        next();
    });
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
