import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

// Allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://auth-service-xi-seven.vercel.app',
  'http://localhost:5173',
].filter(Boolean);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

// Importing routes
import userRoutes from './routes/user.js';

// Using routes
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});