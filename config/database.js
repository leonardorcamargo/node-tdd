import mongoose from 'mongoose';

mongoose.Promise = Promise;

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://mongodb:27017/test';
const connect = () => mongoose.connect(mongodbUrl, { useNewUrlParser: true });

export default {
  connect,
};
