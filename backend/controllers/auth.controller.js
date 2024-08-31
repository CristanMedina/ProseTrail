import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../email/authEmails.js';

export const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "Todos los campos deben ser llenados." });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Este correo ya está registrado." });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = crypto.randomInt(100000, 999999).toString(); // More secure random token

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'Usuario creado con éxito',
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.error("Error en SignUp:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            await User.findOneAndDelete({
                verificationToken: code,
                isVerified: false,
            });
            return res.status(400).json({ success: false, message: "Código inválido o vencido" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Correo ha sido verificado con éxito",
            user: { ...user._doc, password: undefined }
        });

    } catch (error) {
        console.error("Error en VerifyEmail:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Cuenta o Contraseña incorrecta" });
        }

        if (!user.isVerified && user.verificationTokenExpiresAt < Date.now()) {
            await User.findByIdAndDelete(user._id);
            return res.status(400).json({ success: false, message: "Usuario no verificado. Su cuenta ha sido eliminada." });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Cuenta o Contraseña incorrecta" });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Usuario ingresó con éxito",
            user: { ...user._doc, password: undefined }
        });

    } catch (error) {
        console.error("Error en LogIn:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logOut = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Sesión cerrada con éxito" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "No se encontró el usuario" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Link para restablecer contraseña enviado con éxito" });
    } catch (error) {
        console.error("Error en ForgotPassword:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Código para restablecer inválido o ya expiró" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email, user.name);

        res.status(200).json({ success: true, message: "Contraseña nueva guardada" });
    } catch (error) {
        console.error("Error en ResetPassword:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "Usuario no encontrado" });
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.error("Error en CheckAuth:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
