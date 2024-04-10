const router = require('express').Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');
const {
  validateMovies,
  validateDeleteMovie,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateMovies, createMovies);
router.delete('/movies/:_id', validateDeleteMovie, deleteMovies);

module.exports = router;
