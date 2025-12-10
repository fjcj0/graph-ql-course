import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
}, { timestamps: true });
export const Book = mongoose.model('Book', bookSchema);