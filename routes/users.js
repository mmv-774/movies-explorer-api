const router = require('express').Router();
const { celebrate } = require('celebrate');
const { patchUserSchema } = require('../middlewares/validator');
const { getUser, patchUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate(patchUserSchema), patchUser);

module.exports = router;
