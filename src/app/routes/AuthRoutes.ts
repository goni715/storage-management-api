import express from 'express';
import { changePassword, createNewPassword, forgotPasswordVerifyEmail, forgotPasswordVerifyOtp, login, register } from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password-verify-email', forgotPasswordVerifyEmail);
router.post('/forgot-password-verify-otp', forgotPasswordVerifyOtp);
router.post("/create-new-password",createNewPassword);

router.put("/change-password", AuthMiddleware, changePassword);


export default router;