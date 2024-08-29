import express from "express";
import { createBook } from "../controllers/bookWriting.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/create-book', verifyToken, createBook);

export default router;