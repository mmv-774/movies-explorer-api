const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.use(authRouter);
router.use(userRouter);
router.use(movieRouter);

module.exports = router;
