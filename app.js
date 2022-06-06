require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { notFoundErrorHandler, httpErrorHandler } = require('./middlewares/middlewares');
const auth = require('./middlewares/auth');
const router = require('./routes/index');

const { NODE_ENV, DB_URI, PORT = 3000 } = process.env;

const app = express();
mongoose.connect(NODE_ENV === 'production' ? DB_URI : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);
app.use(cors());
app.use(router);
app.use(errorLogger);
app.use('*', auth, notFoundErrorHandler);
app.use(errors());
app.use(httpErrorHandler);

app.listen(PORT);
