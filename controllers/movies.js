const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');
const ValidationError = require('../utils/ValidationError');
const AccessError = require('../utils/AccessError');

const createMovies = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
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
      trailerLink: trailer,
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
    next(err);
  }
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send(movies);
  } catch (err) {
    next(err);
  }
};

const deleteMovies = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const movieToDelete = await Movie.findById({ _id }).orFail(
      new NotFoundError('Фильм не найден'),
    );
    if (req.user._id !== '{movieToDelete.owner}') {
      throw new AccessError('Нет прав на удаление фильма');
    }
    await movieToDelete.deleteOne();
    return res.send({ message: 'Фильм успешно удален' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMovies,
  getMovies,
  deleteMovies,
};
