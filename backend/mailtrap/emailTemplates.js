export const VERIFICATION_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Correo Electrónico</title>
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background-color: #eef2f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 25px 0;
            background: linear-gradient(90deg, #007bff 0%, #00b4d8 100%);
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            color: #ffffff;
            font-size: 30px;
            font-weight: bold;
            margin: 0;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content h1 {
            font-size: 28px;
            color: #007bff;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 17px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }
        .verification-code {
            font-size: 40px;
            font-weight: bold;
            letter-spacing: 6px;
            color: #007bff;
            background-color: #eaf4ff;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #777777;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Codigo de Verificación</h1>
        </div>
        <div class="content">
            <h1>Verificación de Correo Electrónico</h1>
            <p>¡Hola!</p>
            <p>Ya casi estas por registrarte en nuestra plataforma. Para completar tu proceso, por favor verifica tu dirección de correo electrónico utilizando el siguiente código:</p>
            <div id="verification-code" class="verification-code">
                {verificationCode}
            </div>
            <p>Si no has solicitado esta verificación, puedes ignorar este correo.</p>
        </div>
        <div class="footer">
            <p>© 2024 Testeador. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`

export const WELCOME_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Nuestra Plataforma</title>
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background-color: #eef2f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 25px 0;
            background: linear-gradient(90deg, #007bff 0%, #00b4d8 100%);
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            color: #ffffff;
            font-size: 30px;
            font-weight: bold;
            margin: 0;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content h1 {
            font-size: 28px;
            color: #007bff;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 17px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }
        .content .email {
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #777777;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡BIENVENIDO A NUESTRA PLATAFORMA!</h1>
        </div>
        <div class="content">
            <h1>¡Hola, {username}!</h1>
            <p>Gracias por unirte a nuestra plataforma. Estamos emocionados de tenerte a bordo.</p>
            <p>Te has registrado con el correo electrónico: <span class="email">{userEmail}</span>.</p>
            <p style="font-size: 14px;">Si este no es tu correo o no reconoces esta acción, puedes ignorar este mensaje.</p>
        </div>
        <div class="footer">
            <p>© 2024 Testeador. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`

export const RESET_PASSWORD_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background-color: #eef2f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 25px 0;
            background: linear-gradient(90deg, #ff4747 0%, #ff0000 100%);
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            color: #ffffff;
            font-size: 30px;
            font-weight: bold;
            margin: 0;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content h1 {
            font-size: 24px;
            color: #b51919;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 17px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }
        .reset-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #d7d7d7;
            border-radius: 5px;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #777777;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Restablecer tu Contraseña</h1>
        </div>
        <div class="content">
            <h1>Hola</h1>
            <p>Recibimos una solicitud para restablecer tu contraseña</p>
            <h1>Correo: {email}</h1>
            <p>Si no hiciste esta solicitud, puedes ignorar este correo.</p>
            <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>
            <a href="{resetLink}" class="reset-button">Restablecer Contraseña</a>
            <p>Este enlace es válido por 24 horas.</p>
        </div>
        <div class="footer">
            <p>© 2024 Testeador. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`

export const SUCCESSFUL_RESET_PASSWORD_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contraseña Restablecida</title>
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background-color: #eef2f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 25px 0;
            background: linear-gradient(90deg, #28a745 0%, #218838 100%);
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            color: #ffffff;
            font-size: 30px;
            font-weight: bold;
            margin: 0;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content h1 {
            font-size: 24px;
            color: #218838;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 17px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }
        .content .email {
            font-weight: bold;
            color: #218838;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #777777;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Contraseña Restablecida con Éxito</h1>
        </div>
        <div class="content">
            <h1>¡Hola, {username}!</h1>
            <p>Tu contraseña ha sido restablecida con éxito. Ya puedes acceder a tu cuenta con tu nueva contraseña.</p>
            <p>Si no realizaste esta solicitud, por favor contacta a nuestro soporte inmediatamente.</p>
            <p>Correo asociado: <span class="email">{userEmail}</span></p>
        </div>
        <div class="footer">
            <p>© 2024 Testeador. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>

`