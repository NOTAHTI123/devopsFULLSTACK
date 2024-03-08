const Movie = require('../models/Movie/Movie');
const ApiFeatures = require('../utils/apiFeatures.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const cloudinary = require('cloudinary');

// Add a new movie
exports.addMovie = catchAsyncErrors(async (req, res, next) => {
    
    req.body.images = [];
    req.body.cast = JSON.parse(req.body.cast);

    let myCloud = await cloudinary.v2.uploader.upload(req.body.poster, {
        folder: "fmovies_vids",
        width: 540,
        crop: "scale",
    });
    
    req.body.images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    })
    
    myCloud = await cloudinary.v2.uploader.upload(req.body.cover, {
        folder: "fmovies_vids",
        width: 1080,
        crop: "scale",
    });
    
    req.body.images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    })

    req.body.servers = [{
        name: req.body.server_name,
        url: req.body.server_url
    }]

    delete req.body.server_name;
    delete req.body.server_url;
    

    const movie = await Movie.create(req.body);

    if(!movie) {
        return res.status(401).json({
            success: false,
            message: 'Unable to upload movie'
        })
    }

    res.status(200).json({
        success: true,
        movie: req.body
    })
})

// Get all movies
exports.getAllMovies = catchAsyncErrors(async (req, res, next) => {


    const apiFeatures = new ApiFeatures(Movie.find(), req.query)
    .search()
    .filter()
    .pagination(10)

    const movies = await apiFeatures.query.exec();

    res.status(200).json({
        success: true,
        movies
    })
})

// Get movie details
exports.getMovieDetails = catchAsyncErrors(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id);

    if(!movie) {
        return res.status(404).json({
            success: false,
            message: `Requested movie not found`
        })
    }

    res.status(200).json({
        movie
    })
})

// Update Movie
exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id);

    if(!movie) {
        return res.status(404).json({
            success: false,
            message: `Requested movie not found`
        })
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        success: true,
        movie
    })
})

// Delete Movie
exports.deleteMovie = catchAsyncErrors(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id);

    if(!movie) {
        return res.status(404).json({
            success: false,
            message: 'Movie not found'
        })
    }

    await movie.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Movie deleted successfully'
    })
})