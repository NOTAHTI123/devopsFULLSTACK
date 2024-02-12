const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload')

const Movie = require('./routes/movieRoutes');
const User = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    // origin: ['http://localhost:32001', 'http://192.168.1.111:32001'], // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(fileUpload());

app.use('/api/fmovies', Movie);
app.use('/api/fmovies', User);

module.exports = app;