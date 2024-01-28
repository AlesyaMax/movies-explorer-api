const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/bitfilmsdb';
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;
const SECRET_KEY = 'dev-secret';

module.exports = {
  PORT,
  DB_URL,
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  SECRET_KEY,
};
