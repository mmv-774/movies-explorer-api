const { Joi } = require('celebrate');
const validator = require('validator');

const customValidateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(`Поле ${helpers.state.path[0]} заполнено некорректно`);
};

const signInSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const patchUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
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
    image: Joi.string().required().custom(customValidateUrl),
    trailerLink: Joi.string().required().custom(customValidateUrl),
    thumbnail: Joi.string().required().custom(customValidateUrl),
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
