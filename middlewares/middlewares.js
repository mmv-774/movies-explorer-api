const HttpError = require('../errors/HttpError');

module.exports.httpErrorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  res.status(500).send({ message: HttpError.internal().message });
  next();
};

module.exports.notFoundErrorHandler = (req, res, next) => {
  next(HttpError.notFound('Указанный путь не найден'));
};
