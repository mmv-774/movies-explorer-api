const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovieSchema, deleteMovieByIdSchema } = require('../middlewares/validator');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/movies', getMovies);
router.post('/movies', celebrate(createMovieSchema), createMovie);
router.delete('/movies/:id', celebrate(deleteMovieByIdSchema), deleteMovieById);

module.exports = router;
