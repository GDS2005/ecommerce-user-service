const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URL;
        if (!url) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }

        await mongoose.connect(url);

        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;