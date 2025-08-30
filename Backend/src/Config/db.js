import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { env } from './env.js';

export async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGODB_URI, { autoIndex: true });
  logger.info('MongoDB connected');
}
