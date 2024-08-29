import { Book } from "../models/book.model.js";

export const createBook = async (req, res) => {

    if (!req.userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    try {
        const { title } = req.body;

        const book = new Book({
            title,
            author: req.userId,
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