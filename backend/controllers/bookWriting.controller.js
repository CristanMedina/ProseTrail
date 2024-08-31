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
        logger.warn('Se intento actualizar un libro sin autenticación');
        return res.status(401).json({ success: false, message: "Usuario no autenticado" });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOne({ _id: bookId, author: user.name });

        if (!book) {
            logger.warn(`Ni el Libro ni autor fueron encontrados: ${bookId}`);
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." });
        };

        delete updates._id;
        delete updates.author;
        delete updates.likes;
        delete updates.reviews;
        delete updates.publishedDate;

        const updateBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: updates },
            { new: true, runValidators: true, context: 'query' }
        );

        await updateBook.save();

        logger.info(`Libro actualizado con exito: ${updateBook._id}`);
        res.status(200).json({
            success: true,
            message: "Libro actualizado con exito",
            book: {...updateBook._doc},
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(`Error actualizando libro: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
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

export const getBooks = async (req, res) => {
    
};