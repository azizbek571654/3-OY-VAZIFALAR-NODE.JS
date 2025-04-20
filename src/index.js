import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import todoRoutes from './routes/todoRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { startBot } from './controller/botController.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Todo Telegram Bot API!' });
});

// Error handler middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start Telegram bot
startBot();

// Export the Express app
export default app;
