import mongoose from 'mongoose';

async function initMongoConnection() {
  const MONGODB_USER = process.env.MONGODB_USER;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
  const MONGODB_URL = process.env.MONGODB_URL;
  const MONGODB_DB = process.env.MONGODB_DB;
  const DB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
    throw error;
  }
}

export { initMongoConnection };
