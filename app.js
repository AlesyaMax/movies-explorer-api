require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_URL } = process.env;
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log({ message: 'i work just fine' });
});
