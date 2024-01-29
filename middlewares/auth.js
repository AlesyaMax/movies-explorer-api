const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const AuthError = require('../utils/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new AuthError('Необходимо авторизоваться');
    }
    const validToken = token.replace('jwt=', '');
    payload = jwt.verify(
      validToken,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
    );
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

const clearCookie = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Пользователь вышел из аккаунта' });
};

module.exports = { auth, clearCookie };
