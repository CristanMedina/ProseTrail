import express from "express";
import { createBook, updateBook } from "../controllers/bookWriting.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/create-book', verifyToken, createBook);
router.post('/update-book/:bookId', verifyToken, updateBook);

export default router;