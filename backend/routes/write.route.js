import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getUserBooks,
  publishBook,
  updateBook,
  uploadCoverImage,
  toggleLikeBook
} from "../controllers/bookWriting.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/create-book', verifyToken, createBook);
router.patch('/update-book/:bookId', verifyToken, updateBook);
router.patch('/publish-book/:bookId', verifyToken, publishBook);
router.patch('/like-book/:bookId', verifyToken, toggleLikeBook);
router.patch('/upload-cover/:bookId', verifyToken, upload.single("cover"), uploadCoverImage);
router.delete('/delete-book/:bookId', verifyToken, deleteBook);
router.get('/user/:userId/books', verifyToken, getUserBooks);
router.get('/book/:bookId', getBookById);
router.get('/all-books', getAllBooks);

export default router;
