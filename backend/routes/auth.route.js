import express from "express";
import { logIn, logOut, signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

    router.post('/signup', signUp);
    router.post('/login',logIn);
    router.post('/signin',signIn);
    router.post('/logout',logOut);

export default router;