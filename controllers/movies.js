const { DocumentNotFoundError, ValidationError, CastError } = require('mongoose').Error;
const HttpError = require('../errors/HttpError');
const Movie = require('../models/movie');

const movieQueryErrorHandler = (error, next, messages = {}) => {
  if (error instanceof HttpError) {
    next(error);
    return;
  }
  if (error instanceof DocumentNotFoundError) {
    next(HttpError.notFound(messages.documentNotFound || 'Фильм с указанным id не найден'));
    return;
  }
  if (error instanceof ValidationError || error instanceof CastError) {
    next(HttpError.badRequest(messages.validation || 'Переданы некорректные данные'));
    return;
  }
  next(HttpError.internal(messages.internal));
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ movies });
    })
    .catch((error) => movieQueryErrorHandler(error, next));
};

module.exports.createMovie = (req, res, next) => {
  const body = {
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
  };
  Movie.create({ ...body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((error) => movieQueryErrorHandler(error, next, { validation: 'Переданы некорректные данные для создания фильма' }));
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw HttpError.forbidden('Нельзя удалять чужие фильмы');
      }
      return Movie.deleteOne({ _id: req.params.id }).then(() => res.send(movie));
    })
    .catch((error) => movieQueryErrorHandler(error, next, { validation: 'Переданы некорректные данные для удаления фильма' }));
};
