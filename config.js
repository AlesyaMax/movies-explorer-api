const PORT = 3006;
const DEV_DB_URL = 'mongodb://localhost:27017/bitfilmsdb';
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;
const SECRET_KEY = 'dev-secret';
const REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const REGEX_RU = /^[\wа-яА-ЯёЁ\d.,:;?!\-()+=%#№$^&*\s]+$/;
const REGEX_EN = /^[\w.,:;?!\-()+=%#№$^&*\s]+$/;
const REGEX_ID = /[0-9a-f]{24}/;

const movieNotFoundMessage = 'Фильм не найден';
const accessErrorMessage = 'Нет прав на удаление фильма';
const movieDeletedMessage = 'Фильм успешно удален';
const duplicateErrorMessage = 'Такой пользователь уже существует';
const authErrorMessage = 'Неправильный логин или пароль';
const userNotFoundMessage = 'Пользователь не найден';
const authRequiredMessage = 'Необходимо авторизоваться';
const signoutMessage = 'Пользователь вышел из аккаунта';
const serverErrorMessage = 'Ошибка на стороне сервера';
const incorrectUrlMessage = 'Некорректный URL';
const incorrectEmailMessage = 'Некорректно указана почта';
const pageNotFoundMessage = 'Страница не найдена';

module.exports = {
  PORT,
  DEV_DB_URL,
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  SECRET_KEY,
  REGEX_URL,
  REGEX_RU,
  REGEX_EN,
  REGEX_ID,
  movieNotFoundMessage,
  accessErrorMessage,
  movieDeletedMessage,
  duplicateErrorMessage,
  authErrorMessage,
  userNotFoundMessage,
  authRequiredMessage,
  signoutMessage,
  serverErrorMessage,
  incorrectUrlMessage,
  incorrectEmailMessage,
  pageNotFoundMessage,
};
