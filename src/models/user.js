import mongoose from 'mongoose';
import Util from 'util';
import bcrypt from 'bcrypt';

const hashAsync = Util.promisify(bcrypt.hash);
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
    password: ret.password,
    role: ret.role,
  }),
});

schema.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }
  hashAsync(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
    .catch(err => next(err));
});

const User = mongoose.model('User', schema);

export default User;
