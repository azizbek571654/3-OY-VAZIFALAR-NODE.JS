import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Create an in-memory MongoDB instance for development/testing
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI.includes('mongodb://')) {
      console.log('Using MongoDB memory server for development');
      
      // Connect to MongoDB - without deprecated options
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    }
    
    // Connect to MongoDB - without deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Don't exit the process, allow the application to continue
    // Just log the error and return null
    return null;
  }
};

export default connectDB;
