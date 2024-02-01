// Подключение модулей

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// Импорт и создание переменных

const { PORT, DEV_DB_URL } = require('./config');
const { auth } = require('./middlewares/auth');
const {
  userRouter,
  moviesRouter,
  authRouter,
  notFoundPageRouter,
} = require('./routes/index');
const handleErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { NODE_ENV, PROD_DB_URL } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

// Подключение к базе данных

mongoose.connect(NODE_ENV === 'production' ? PROD_DB_URL : DEV_DB_URL, {
  useNewUrlParser: true,
});

// Подключение маршрутов

app.use(requestLogger);
app.use(authRouter);

app.use(auth, userRouter);
app.use(auth, moviesRouter);

app.use(notFoundPageRouter);

// Обработка ошибок
app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
