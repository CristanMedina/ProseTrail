import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';

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
        res.status(404).json({success: false, message: error.message});
    }
}

export const logIn = async (req, res) => {
    res.send("Login Route");
}

export const signIn = async (req, res) => {
    res.send("SignIn Route");
}

export const logOut = async (req, res) => {
    res.send("LogOut Route");
}