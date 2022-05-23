const router = require('express').Router();
const { celebrate } = require('celebrate');
const { patchUserSchema } = require('../middlewares/validator');

const { getUser, patchUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate(patchUserSchema), patchUser);

module.exports = router;
