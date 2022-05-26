const router = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { signInSchema, signUpSchema } = require('../middlewares/validator');

router.post('/signin', celebrate(signInSchema), login);
router.post('/signup', celebrate(signUpSchema), createUser);

module.exports = router;
