import { Book } from "../models/book.model.js";
import { User } from '../models/user.model.js';

export const createBook = async (req, res) => {
    const { title } = req.body;

    if (!req.userId) {
        return res.status(401).json({ success: false, message: 'User no autenticado' });
    }

    try {
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(401).json({ success: false, message: 'Usuario no encntrado'});
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
            message: 'New book created successfully',
            book: { ...book._doc },
        });
    } catch (error) {
        console.error("Error creating book:", error);
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
            return res.status(401).json({ success: false, message: "Libro no encontrado, o no eres el autor." })
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