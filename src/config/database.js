import mongoose from 'mongoose';

mongoose.Promise = Promise;

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test';
const connect = () => mongoose.connect(mongodbUrl, { useNewUrlParser: true });

export default {
  connect,
};
