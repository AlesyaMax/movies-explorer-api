const jwt = require('jsonwebtoken');
const {
  SECRET_KEY,
  authRequiredMessage,
  signoutMessage,
} = require('../config');
const AuthError = require('../utils/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new AuthError(authRequiredMessage);
    }
    const validToken = token.replace('jwt=', '');
    payload = jwt.verify(
      validToken,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
    );
  } catch (err) {
    next(new AuthError(authRequiredMessage));
  }

  req.user = payload;
  next();
};

const clearCookie = (req, res) => {
  res.clearCookie('jwt').send({ message: signoutMessage });
};

module.exports = { auth, clearCookie };
