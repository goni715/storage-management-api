"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const router = express_1.default.Router();
router.post('/register', AuthController_1.register);
router.post('/login', AuthController_1.login);
router.post('/forgot-password-verify-email', AuthController_1.forgotPasswordVerifyEmail);
router.post('/forgot-password-verify-otp', AuthController_1.forgotPasswordVerifyOtp);
router.post("/create-new-password", AuthController_1.createNewPassword);
router.put("/change-password", AuthMiddleware_1.default, AuthController_1.changePassword);
exports.default = router;
