const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');
const ValidationError = require('../utils/ValidationError');
const AccessError = require('../utils/AccessError');
const {
  movieNotFoundMessage,
  accessErrorMessage,
  movieDeletedMessage,
} = require('../config');

const createMovies = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(err.message));
    }
    return next(err);
  }
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

const deleteMovies = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const movieToDelete = await Movie.findById({ _id }).orFail(
      new NotFoundError(movieNotFoundMessage),
    );
    if (req.user._id !== `${movieToDelete.owner}`) {
      throw new AccessError(accessErrorMessage);
    }
    await movieToDelete.deleteOne();
    return res.send({ message: movieDeletedMessage });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createMovies,
  getMovies,
  deleteMovies,
};
