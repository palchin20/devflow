import { error } from 'console';
import mongoose, { Mongoose } from 'mongoose';
import logger from './logger';
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined.');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info('Using existing mongoose connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    cached = global.mongoose = { conn: null, promise: null };

    if (!cached.promise) {
      logger.info('Using new mongoose connection.');
      cached.promise = mongoose
        .connect(MONGODB_URI, { dbName: 'devflow' })
        .then((result) => {
          logger.info('Connected to MongoDB');
          return result;
        })
        .catch((error) => {
          logger.error('Error connecting to MongoDB', error);
          throw error;
        });
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
