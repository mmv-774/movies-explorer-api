require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { notFoundErrorHandler, httpErrorHandler } = require('./middlewares/middlewares');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(cors());
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);
app.use('*', auth, notFoundErrorHandler);
app.use(errors());
app.use(httpErrorHandler);

app.listen(PORT);
