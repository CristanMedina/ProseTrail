import { Book } from "../models/book.model.js";
import { User } from '../models/user.model.js';

export const createBook = async (req, res) => {
    const { title } = req.body;

    if (!req.userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(401).json({ success: false, message: 'Usuario no encontrado'});
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

        res.status(201).json({
            success: true,
            message: 'Libro creado con exito',
            book: { ...book._doc },
        });
    } catch (error) {
        console.error("Error creando libro:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const updates = req.body;

    if(!req.userId) {
        return res.status(401).json({ success: false, message: "Usuario no autenticado" })
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOne({ _id: bookId, author: user.name });

        if(!book) {
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." })
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

        await book.save();

        res.status(200).json({
            success: true,
            message: "Libro actualizado con exito",
            book: updateBook
        });
    } catch (error) {
        console.error("Error al actualizar libro: ", error);
        res.status(400).json({ success: false, message:error.message });
    }
};

export const publishBook = async (req, res) => {
    const { bookId } = req.params;
    
    if (!req.userId) {
        return res.status(401).json({ success: false, message: 'User no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOneAndUpdate(
            { _id: bookId, author: user.name},
            { status: "Terminado" },
            { new: true }
        );

        if(!book) {
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." })
        };

        await book.save();

        res.status(200).json({ 
            success: true, 
            message: "Libro publicado con exito",
            book: { ...book._doc },
        })
    } catch (error) {
        console.error("Error publicando Libro:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    const { bookId } = req.params;
    
    if (!req.userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);
        const book = await Book.findOneAndDelete(
            { _id: bookId, author: user.name},
        );

        if(!book) {
            return res.status(404).json({ success: false, message: "Libro no encontrado, o no eres el autor." })
        };

        res.status(200).json({ 
            success: true, 
            message: "Libro borrado con exito"
        })
    } catch (error) {
        console.error("Error borrando Libro:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};