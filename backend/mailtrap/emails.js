import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, RESET_PASSWORD_EMAIL_TEMPLATE, SUCCESSFUL_RESET_PASSWORD_EMAIL_TEMPLATE } from './emailTemplates.js';
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verifica tu correo",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Correo enviado con exito", response)
        
    } catch (error) {
        console.error(`Error al enviar correo de verificacion `, error)
        throw new Error(`Error enviando correo de verificación: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `Bienvenido ${name}`,
            html: WELCOME_EMAIL_TEMPLATE.replace("{username}", name).replace("{userEmail}", email),
            category: "Welcome Email"
        });

        console.log("Correo de bienvenida enviado con exito",response);
    } catch (error) {
        console.error("Error al enviar correo de bienvenida", error);
        throw new Error(`Error al enviar correo de bienvenida: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reestablecer contraseña',
            html: RESET_PASSWORD_EMAIL_TEMPLATE.replace("{resetLink}", resetURL).replace("{email}", email),
            category: "Password Reset"
        })
    } catch (error) {
        console.error("Error al enviar correo de reestablecer contraseña", error);
        throw new Error(`Error al enviar correo de reestablecer contraseña: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Nueva contraseña guardada',
            html: SUCCESSFUL_RESET_PASSWORD_EMAIL_TEMPLATE.replace("{username}", name).replace("{userEmail}", email),
            category: "Password Reset"
        });

        console.log("Email de nueva contraseña enviada con exito", response);
    } catch (error) {
        console.error("Error al enviar correo de nueva contraseña", error);
        throw new Error(`Error al enviar correo de nueva contraseña: ${error}`)
    }
}