import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL is not specified in environment variables');
}

export async function initMongoConnection() {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
