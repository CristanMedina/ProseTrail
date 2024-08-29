import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Sin autorización - Ningun token fue dado" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error en verifyToken:", error);
        return res.status(401).json({ success: false, message: "Sin autorización - Token invalido" });
    }
};
