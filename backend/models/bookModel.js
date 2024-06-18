import mongoose from "mongoose"

const bookSchema = mongoose.Schema(
{
    code: {
        type: Number
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    publishYear: {
        type: Number
    }
}, {
    timestamp: true
}
);

export const Book = mongoose.model('Book', bookSchema);