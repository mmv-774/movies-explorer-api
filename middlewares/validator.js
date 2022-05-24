const { Joi } = require('celebrate');

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const signInSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const patchUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

const createMovieSchema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    owner: Joi.string().required().hex().length(24),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieByIdSchema = {
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

module.exports = {
  signInSchema,
  signUpSchema,
  patchUserSchema,
  createMovieSchema,
  deleteMovieByIdSchema,
};
