import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'auth_service_db',
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('MongoDB connection failed');
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;