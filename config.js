const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/bitfilmsdb';
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;
const SECRET_KEY = 'dev-secret';
const REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const REGEX_RU = /^[а-яА-ЯёЁ\d.,:;?!\-()+=%#№$^&*\s]+$/;
const REGEX_EN = /^[\w.,:;?!\-()+=%#№$^&*\s]+$/;
const REGEX_ID = /[0-9a-f]{24}/;

module.exports = {
  PORT,
  DB_URL,
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  SECRET_KEY,
  REGEX_URL,
  REGEX_RU,
  REGEX_EN,
  REGEX_ID,
};
