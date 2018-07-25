import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

schema.set('toJSON', {
  /* eslint-disable no-unused-vars */
  transform: (doc, ret, options) => ({
    /* eslint-disable no-underscore-dangle */
    _id: ret._id,
    email: ret.email,
    password: ret.email,
    role: ret.role,
  }),
});

const User = mongoose.model('User', schema);

export default User;
