import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

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
    reviews: [reviewSchema],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    views: {
        type: Number,
        default: 0
    },

    description: String,
    genres: [String],
    coverImage: String,
    publishedDate: Date,

}, {timestamps: true});

bookSchema.index({ title: 1, author: 1 }, { unique: true });

export const Book = mongoose.model('Book', bookSchema);
