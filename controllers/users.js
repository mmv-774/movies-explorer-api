const { DocumentNotFoundError, ValidationError, CastError } = require('mongoose').Error;
const { duplicateKeyError } = require('../errors/errorConstants');
const HttpError = require('../errors/HttpError');
const User = require('../models/user');

const userQueryErrorHandler = (error, next, messages = {}) => {
  if (error instanceof HttpError) {
    next(error);
    return;
  }
  if (error instanceof DocumentNotFoundError) {
    next(HttpError.notFound(messages.documentNotFound || 'Пользователь по указанному id не найден'));
    return;
  }
  if (error instanceof ValidationError || error instanceof CastError) {
    next(HttpError.badRequest(messages.validation || 'Переданы некорректные данные'));
    return;
  }
  if (error.constructor.name === duplicateKeyError.name && error.code === duplicateKeyError.code) {
    next(HttpError.conflict(messages.conflict || `Пользователь с таким ${Object.keys(error.keyValue)[0]} уже существует`));
    return;
  }
  next(HttpError.internal(messages.internal));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => userQueryErrorHandler(error, next, { validation: 'Переданы некорректные данные для получения пользователя' }));
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => userQueryErrorHandler(error, next, { validation: 'Переданы некорректные данные для обновлении профиля' }));
};
