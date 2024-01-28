const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');

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
    await Movie.findByIdAndDelete({ _id }).orFail(
      new NotFoundError('Фильм не найден'),
    );
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
