import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content:{
        type : String,
        default: ' ',
        required: true
    },
    status: {
        type: String,
        enum: ['Terminado', 'En progreso'],
        default: 'En progreso'
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
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