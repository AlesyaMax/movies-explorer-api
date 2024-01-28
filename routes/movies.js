const router = require('express').Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovies);
router.delete('/movies/:_id', deleteMovies);

module.exports = router;
