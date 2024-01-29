const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY, {
  expiresIn: '7d',
});

module.exports = generateToken;
