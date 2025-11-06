import { Book } from "../models/book.model.js";
import { User } from '../models/user.model.js';
import fs from "fs";
import path from "path";
import logger from '../utils/logger.js';

export const createBook = async (req, res) => {
    const { title } = req.body;

    if (!req.userId) {
        logger.warn('Se intento crear un libro sin autenticación');
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            logger.warn(`Usuario no encontrado: ${req.userId}`);
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        const titleAlreadyExists = await Book.findOne({ title: title});
        if(titleAlreadyExists){
            logger.warn(`Usuario no encontrado: ${req.userId}`);
            return res.status(400).json({ success: false, message: 'Ya tienes un cuento con ese titulo' })
        }

        const book = new Book({
            title,
            author: user.name,
            content: " ",
            status: "En progreso",
            description: " ",
            genres: [],
            coverImage: " ",
            publishedDate: null,
        });

        await book.save();

        logger.info(`Libro creado con exito: ${book._id}`);
        res.status(201).json({
            success: true,
            message: 'Libro creado con exito',
            book: { ...book._doc },
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Error creando libro: ${error.message}`);
        res.status(400).json({ success: false, message: `Error al crear cuento: \n ${error.message}` });
    }
};

export const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const updates = req.body;

    if (!req.userId) {
        logger.warn('Attempt to update a book without authentication');
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOne({ _id: bookId, author: user.name });

        if (!book) {
            logger.warn(`Book or author not found: ${bookId}`);
            return res.status(404).json({ success: false, message: "Book not found, or you are not the author." });
        };

        const forbiddenUpdates = ['_id', 'author', 'likes', 'reviews', 'publishedDate'];
        forbiddenUpdates.forEach(field => delete updates[field]);

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: updates },
            { new: true, runValidators: true, context: 'query' }
        );

        logger.info(`Book successfully updated: ${updatedBook._id}`);
        return res.status(200).json({
            success: true,
            message: "Book successfully updated",
            book: updatedBook,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Error updating book: ${error.message}`);
        return res.status(400).json({ success: false, message: error.message });
    }
};


export const publishBook = async (req, res) => {
  const { bookId } = req.params;

  if (!req.userId) {
    logger.warn('Se intentó publicar un libro sin autenticación');
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }

  try {
    const user = await User.findById(req.userId);
    const book = await Book.findOne({ _id: bookId, author: user.name });

    if (!book) {
      logger.warn(`Ni el Libro ni autor fueron encontrados: ${bookId}`);
      return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." });
    }

    const updates = {
      status: "Terminado"
    };

    if (!book.publishedDate) {
      updates.publishedDate = new Date();
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, { new: true });

    logger.info(`Libro publicado con éxito: ${updatedBook._id}`);
    return res.status(200).json({
      success: true,
      message: "Libro publicado con éxito",
      book: { ...updatedBook._doc },
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    logger.error(`Error publicando libro: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBook = async (req, res) => {
    const { bookId } = req.params;

    if (!req.userId) {
        logger.warn('Se intento borrar un libro sin autenticación');
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOneAndDelete(
            { _id: bookId, author: user.name }
        );

        if (!book) {
            logger.warn(`Ni el Libro ni autor fueron encontrados: ${bookId}`);
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." });
        }

        logger.info(`Libro borrado con exito: ${book._id}`);
        res.status(200).json({
            success: true,
            message: "Libro borrado con exito",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Error borrando libro: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
    }
};


export const getUserBooks = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).sort({ createdAt: -1 });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userName = user.name;

        const books = await Book.find({ author: userName });
        res.json({ books });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener libros" });
    }
};


const recentViews = new Map();

export const getBookById = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.userId;
  const ip = req.ip;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      logger.warn(`Libro no encontrado: ${bookId}`);
      return res.status(404).json({ success: false, message: "Libro no encontrado." });
    }

    let isAuthor = false;
    if (userId) {
      const user = await User.findById(userId);
      if (user && user.name === book.author) {
        isAuthor = true;
      }
    }

    if (!isAuthor) {
      const key = `${userId || ip}_${bookId}`;
      const now = Date.now();
      const lastView = recentViews.get(key) || 0;

      if (now - lastView > 5 * 60 * 1000) {
        await Book.findByIdAndUpdate(bookId, { $inc: { views: 1 } });
        book.views = (book.views || 0) + 1;
        recentViews.set(key, now);
        logger.info(`Vista registrada para libro: ${bookId} por ${userId || ip}`);
      } else {
        logger.info(`Vista NO registrada (demasiado pronto) para libro: ${bookId} por ${userId || ip}`);
      }
    } else {
      logger.info(`El autor accedió al libro: ${bookId}`);
    }

    logger.info(`Libro obtenido con éxito: ${book._id}`);
    return res.status(200).json({
      success: true,
      message: "Libro obtenido con éxito",
      book: book,
    });
  } catch (error) {
    logger.error(`Error obteniendo libro: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};



export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ status: 'Terminado' });
        if(!books){
            logger.warn(`No se encontraron libros`);
            return res.status(404).json({ success: false, message: "No se encontraron libros." });
        }
        logger.info('Todos los libros publicados fueron obtenidos', books.map(book => book._id));

        res.status(200).json({
            success: true,
            message: "Todos los libros publicados fueron obtenidos",
            books: books.map(book => ({ ...book._doc }))
        });
    } catch (error) {
        logger.error(`Error al buscar libros: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const uploadCoverImage = async (req, res) => {
  const { bookId } = req.params;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No se proporcionó ninguna imagen" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Libro no encontrado" });
    }

    if (book.coverImage) {
      const oldImagePath = path.join(process.cwd(), 'frontend/public/covers', book.coverImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    book.coverImage = req.file.filename;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Portada actualizada correctamente",
      coverImage: `/covers/${book.coverImage}`,
      book,
    });
  } catch (error) {
    console.error("Error al subir portada:", error);
    res.status(500).json({ success: false, message: "Error al subir la portada" });
  }
};

export const toggleLikeBook = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.userId;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      logger.warn(`Intento de Like en libro no existente: ${bookId}`);
      return res.status(404).json({ success: false, message: "Libro no encontrado" });
    }

    const isLiked = book.likes.includes(userId);

    if (isLiked) {
      await Book.updateOne({ _id: bookId }, { $pull: { likes: userId } });
    } else {
      await Book.updateOne({ _id: bookId }, { $addToSet: { likes: userId } });
    }

    const updatedBook = await Book.findById(bookId);

    logger.info(`Like actualizado para libro: ${bookId} por usuario: ${userId}`);
    return res.status(200).json({
      success: true,
      message: "Like actualizado",
      book: updatedBook
    });

  } catch (error) {
    logger.error(`Error al actualizar like: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const commentBook = async (req, res) => {
  const { bookId } = req.params;
  const { text } = req.body;
  const userId = req.userId;

  if (!text || text.trim() === '') {
    return res.status(400).json({ success: false, message: "El comentario no puede estar vacío" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const comment = {
      user: userId,
      name: user.name,
      text: text,
    };

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: { $each: [comment], $position: 0 } } },
      { new: true }
    );

    if (!updatedBook) {
      logger.warn(`Intento de comentar en libro no existente: ${bookId}`);
      return res.status(404).json({ success: false, message: "Libro no encontrado" });
    }

    logger.info(`Comentario añadido a libro: ${bookId} por usuario: ${userId}`);
    return res.status(201).json({
      success: true,
      message: "Comentario añadido",
      book: updatedBook
    });

  } catch (error) {
    logger.error(`Error al añadir comentario: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { bookId, commentId } = req.params;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ success: false, message: "Libro o usuario no encontrado" });
    }

    const comment = book.reviews.find(r => r._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: "Comentario no encontrado" });
    }

    const isCommentAuthor = comment.user.toString() === userId;
    const isBookAuthor = book.author === user.name;

    if (!isCommentAuthor && !isBookAuthor) {
      logger.warn(`Intento no autorizado para borrar comentario: ${commentId} por usuario: ${userId}`);
      return res.status(403).json({ success: false, message: "No autorizado para eliminar este comentario" });
    }

    await Book.updateOne(
      { _id: bookId },
      { $pull: { reviews: { _id: commentId } } }
    );

    const updatedBook = await Book.findById(bookId);

    logger.info(`Comentario eliminado: ${commentId} por usuario: ${userId}`);
    return res.status(200).json({
      success: true,
      message: "Comentario eliminado",
      book: updatedBook
    });

  } catch (error) {
    logger.error(`Error al eliminar comentario: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
