const userRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const notFoundPageRouter = require('./notFoundPage');

module.exports = {
  userRouter,
  moviesRouter,
  authRouter,
  notFoundPageRouter,
};
