const router = require('express').Router();
const NotFoundError = require('../utils/NotFoundError');
const { pageNotFoundMessage } = require('../config');

router.use('/', (req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
