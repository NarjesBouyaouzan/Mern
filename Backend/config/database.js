// Database configuration file
import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGO_URI from environment variables
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learnhub');
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
