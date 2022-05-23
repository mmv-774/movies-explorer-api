const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovieSchema, deleteMovieByIdSchema } = require('../middlewares/validator');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(createMovieSchema), createMovie);
router.delete('/:id', celebrate(deleteMovieByIdSchema), deleteMovieById);

module.exports = router;
