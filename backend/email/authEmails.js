import path from 'path';
import { fileURLToPath } from 'url';
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    WELCOME_EMAIL_TEMPLATE, 
    RESET_PASSWORD_EMAIL_TEMPLATE, 
    SUCCESSFUL_RESET_PASSWORD_EMAIL_TEMPLATE 
} from './authEmailsTemplates.js';
import { transporter } from './nodemailer.config.js';

// Simular __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
            from: 'Prose Trail <prosetrail@gmail.com>',
            to: email,
            subject: 'Verifica tu correo',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            attachments: [{
                filename: 'dragons.png',
                path: path.join(__dirname, '../img/dragonesSaludo.png'), // Ruta absoluta correcta
                cid: 'dragonesSaludo'
            }],
            category: 'Email Verification'
        });

        console.log('Correo enviado con éxito', response);
    } catch (error) {
        console.error('Error al enviar correo de verificación', error);
        throw new Error(`Error enviando correo de verificación: ${error.message}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: 'Prose Trail <prosetrail@gmail.com>',
            to: email,
            subject: `Bienvenido ${name}`,
            html: WELCOME_EMAIL_TEMPLATE
                .replace('{username}', name)
                .replace('{userEmail}', email),
            category: 'Welcome Email'
        });

        console.log('Correo de bienvenida enviado con éxito', response);
    } catch (error) {
        console.error('Error al enviar correo de bienvenida', error);
        throw new Error(`Error al enviar correo de bienvenida: ${error.message}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: 'Prose Trail <prosetrail@gmail.com>',
            to: email,
            subject: 'Reestablecer contraseña',
            html: RESET_PASSWORD_EMAIL_TEMPLATE
                .replace('{resetLink}', resetURL)
                .replace('{email}', email),
            category: 'Password Reset'
        });

        console.log('Correo para reestablecer contraseña enviado con éxito', response);
    } catch (error) {
        console.error('Error al enviar correo de reestablecer contraseña', error);
        throw new Error(`Error al enviar correo de reestablecer contraseña: ${error.message}`);
    }
};

export const sendResetSuccessEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: 'Prose Trail <prosetrail@gmail.com>',
            to: email,
            subject: 'Nueva contraseña guardada',
            html: SUCCESSFUL_RESET_PASSWORD_EMAIL_TEMPLATE
                .replace('{username}', name)
                .replace('{userEmail}', email),
            category: 'Password Reset'
        });

        console.log('Email de nueva contraseña enviada con éxito', response);
    } catch (error) {
        console.error('Error al enviar correo de nueva contraseña', error);
        throw new Error(`Error al enviar correo de nueva contraseña: ${error.message}`);
    }
};
