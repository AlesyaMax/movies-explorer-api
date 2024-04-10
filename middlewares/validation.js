const { celebrate, Joi } = require('celebrate');
const {
  REGEX_URL, REGEX_RU, REGEX_EN, REGEX_ID,
} = require('../config');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdatedUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX_URL),
    trailerLink: Joi.string().required().regex(REGEX_URL),
    nameRU: Joi.string().required().regex(REGEX_RU),
    nameEN: Joi.string().required().regex(REGEX_EN),
    thumbnail: Joi.string().required().regex(REGEX_URL),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().regex(REGEX_ID),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUpdatedUser,
  validateMovies,
  validateDeleteMovie,
};
