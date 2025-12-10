import 'dotenv/config';
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongourl);
        console.log(`MongoDB Connected successfully!!`);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : error);
    }
};