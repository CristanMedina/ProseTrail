import { Book } from "../models/book.model.js";
import { User } from '../models/user.model.js';
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
        logger.warn('Se intento publicar un libro sin autenticación');
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOneAndUpdate(
            { _id: bookId, author: user.name },
            { status: "Terminado" },
            { new: true }
        );

        if (!book) {
            logger.warn(`Ni el Libro ni autor fueron encontrados: ${bookId}`);
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." });
        }

        await book.save();

        logger.info(`Libro publicado con exito: ${book._id}`);
        res.status(200).json({
            success: true,
            message: "Libro publicado con exito",
            book: { ...book._doc },
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Error publicando libro: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
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

        const user = await User.findById(userId);
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

export const getBookById = async (req, res) => {
    const { bookId } = req.params;

    if (!req.userId) {
        logger.warn('Se intentó obtener un libro sin autenticación');
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOne({ _id: bookId, author: user.name });

        if (!book) {
            logger.warn(`Libro no encontrado o usuario no es el autor: ${bookId}`);
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." });
        }

        logger.info(`Libro obtenido con éxito: ${book._id}`);
        res.status(200).json({
            success: true,
            message: "Libro obtenido con éxito",
            book: { ...book._doc },
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Error obteniendo libro: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
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
