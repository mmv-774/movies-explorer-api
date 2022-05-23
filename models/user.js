const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const HttpError = require('../errors/HttpError');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный адрес эл.почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

schema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(HttpError.unauthorized('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }
        throw HttpError.unauthorized('Неправильные почта или пароль');
      }));
};

module.exports = mongoose.model('user', schema);
