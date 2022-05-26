require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { notFoundErrorHandler, httpErrorHandler } = require('./middlewares/middlewares');
const auth = require('./middlewares/auth');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { NODE_ENV, DB_URI, PORT = 3000 } = process.env;

const app = express();
mongoose.connect(NODE_ENV === 'production' ? DB_URI : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(cors());
app.use(authRouter);
app.use(userRouter);
app.use(movieRouter);
app.use(errorLogger);
app.use('*', auth, notFoundErrorHandler);
app.use(errors());
app.use(httpErrorHandler);

app.listen(PORT);
