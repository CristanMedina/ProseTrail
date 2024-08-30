import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content:{
        type : String,
        default: ' ',
        trim: true
    },
    status: {
        type: String,
        enum: ['Terminado', 'En progreso'],
        default: 'En progreso'
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        trim: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    description: String,
    genres: [String],
    coverImage: String,
    publishedDate: Date,

}, {timestamps: true});

bookSchema.index({ title: 1, author: 1 }, { unique: true });

export const Book = mongoose.model('Book', bookSchema);