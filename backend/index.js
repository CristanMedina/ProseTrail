import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { connectDB } from './db/connectDB.js';

import authRoutes from './routes/auth.route.js';
import writeRoutes from './routes/write.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS: allow all origins in development or restrict in production
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Ensure the covers folder exists (synchronously for simplicity)
import fs from 'fs';
const coversPath = path.join(__dirname, '/covers');
if (!fs.existsSync(coversPath)) {
  fs.mkdirSync(coversPath);
}

// Serve cover images statically
app.use('/covers', express.static(coversPath));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/write", writeRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  connectDB();
  console.log(`Servidor encendido en: http://0.0.0.0:${PORT}`);
});

