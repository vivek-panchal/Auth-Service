import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Importing routes
import userRoutes from './routes/user.js';

// Using routes
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});