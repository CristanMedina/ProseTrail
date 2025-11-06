import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { connectDB } from './db/connectDB.js';
import fs from 'fs';

import authRoutes from './routes/auth.route.js';
import writeRoutes from './routes/write.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const coversPath = path.join(__dirname, 'frontend/public/covers');
if (!fs.existsSync(coversPath)) {
  fs.mkdirSync(coversPath, { recursive: true });
}

app.use('/covers', express.static(coversPath));

app.use("/api/auth", authRoutes);
app.use("/api/write", writeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  connectDB();
  console.log(`Servidor encendido en: http://0.0.0.0:${PORT}`);
});
