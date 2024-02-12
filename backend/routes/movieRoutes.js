const express = require('express');
const { getAllMovies, addMovie, getMovieDetails, deleteMovie, updateMovie } = require('../controllers/movieController');
const router = express.Router();

router.route('/movie/new').post(addMovie);
router.route('/movies/all').get(getAllMovies);
router.route('/movie/:id')
            .get(getMovieDetails)
            .delete(deleteMovie)
            .put(updateMovie);

module.exports = router;