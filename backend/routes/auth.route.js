import express from "express";
import { logIn, logOut, signUp, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

    router.post('/signup', signUp);
    router.post('/login',logIn);
    router.post('/logout',logOut);

    router.post('/verify-email', verifyEmail);

    router.post('/forgot-password', forgotPassword);
    router.post('/reset-password/:token', resetPassword);

export default router;