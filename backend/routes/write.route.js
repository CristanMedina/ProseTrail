import express from "express";
import { createBook, deleteBook, publishBook, updateBook } from "../controllers/bookWriting.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/create-book', verifyToken, createBook);
router.post('/update-book/:bookId', verifyToken, updateBook);
router.patch('/publish-book/:bookId', verifyToken, publishBook);
router.delete('/delete-book/:bookId', verifyToken, deleteBook);

export default router;