import express from 'express';
import { forgotPasswordVerifyEmail, forgotPasswordVerifyOtp, login, register } from '../controllers/AuthController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password-verify-email', forgotPasswordVerifyEmail);
router.post('/forgot-password-verify-otp', forgotPasswordVerifyOtp);


export default router;