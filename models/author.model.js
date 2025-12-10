import mongoose from "mongoose";
const Schema = mongoose.Schema;
const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });
export const Author = mongoose.model('Author', authorSchema);