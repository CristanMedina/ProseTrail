import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/user.model.js';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';

// Logica del SignUp
export const signUp = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("Todos los campos deben ser llenados.");
        }

        const userAlreadyExists = await User.findOne({email});
        console.log("usuario ya existe: ", userAlreadyExists);
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: "Este correo ya esta registrado."});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'Usuario creado con exito',
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}
// Logica del verifyEmail
export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })

        if(!user) {
            return res.status(400).json({success: false, message: "Codigo invalido o vencido"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({success: true, message: "Correo ha sido verificado con exito", user: { ...user._doc, password: undefined}})

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}
// Logica del logIn
export const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "Cuenta o Contraseña incorrecta"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Cuenta o Contraseña incorrecta"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        res.status(200).json({success: true, message: "Usuario ingreso con exito", user: {...user._doc, password: undefined}})

    } catch (error) {
        console.error("Error en Login: ",error);
        return res.status(400).json({success: false, message: error.message});
    }
}
// Logica del logOut
export const logOut = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Sesion cerrada con exito"})
}
// Logica del forgotPassword
export const forgotPassword = async (req, res) => {
   const { email } = req.body;
   try {
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({success: false, message:"No se encontro el usuario"});
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({success: true, message: "Link para reestablecer contraseña enviado con exito"});
   } catch (error) {
        console.error("Error en olvido Contraseña: ",error);
        return res.status(400).json({success: false, message: error.message});
   }
}
// Logica del resetPassword
export const resetPassword = async (req, res) => {
    try {
     const {token} = req.params;
     const {password} = req.body;

     const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
     });

     if(!user){
        return res.status(400).json({ success: false, message: "Codigo para reestablecer invalido o ya expiro" });
     }

     const hashedPassword = await bcryptjs.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email, user.name);

     res.status(200).json({success: true, message: "Contraseña nueva guardada"});
    } catch (error) {
         console.error("Error en Reestablecer Contraseña: ",error);
         return res.status(400).json({success: false, message: error.message});
    }
 }

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(400).json({success: false, message: "Usuario no encontrado" });
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.error("Error en Check Auth: ",error);
         return res.status(400).json({success: false, message: error.message});
    }
}