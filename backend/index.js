import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';

dotenv.config();
await connectDB();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.log('REDIS_URL is not defined in environment variables');
  process.exit(1);
}

export const redisClient = createClient({ url: redisUrl });
redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Could not connect to Redis', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Importing routes
import userRoutes from './routes/user.js';

// Using routes
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});