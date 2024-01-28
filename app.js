// Подключение модулей

// require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

// Импорт и создание переменных

const { PORT, DB_URL } = require('./config');
const { createUser, login } = require('./controllers/users');
const { auth, clearCookie } = require('./middlewares/auth');
const { validateSignup, validateSignin } = require('./middlewares/validation');
const { userRouter } = require('./routes/index');
const { moviesRouter } = require('./routes/index');
const handleErrors = require('./middlewares/errors');
// const { PORT, DB_URL } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
// Подключение к базе данных

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

// Подключение маршрутов

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);
app.use(auth);
app.use('/signout', clearCookie);

app.use(userRouter);
app.use(moviesRouter);

// Обработка ошибок
app.use(errors());

app.use(handleErrors);

app.listen(PORT);
