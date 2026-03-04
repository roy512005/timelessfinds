import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGODB_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL;
        if (!dbUrl) {
            console.warn('No MongoDB URI found. Skipping DB connection.');
            return;
        }
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default mongoose;
