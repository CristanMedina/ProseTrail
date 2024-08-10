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
            <h1>¡BIENVENIDO!</h1>
        </div>
        <div class="content">
            <h1>Verificación de Correo Electrónico</h1>
            <p>¡Hola!</p>
            <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro, por favor verifica tu dirección de correo electrónico utilizando el siguiente código:</p>
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