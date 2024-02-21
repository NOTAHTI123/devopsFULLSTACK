import axios from "axios";

import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    ADD_MOVIE_REQUEST,
    ADD_MOVIE_SUCCESS,
    ADD_MOVIE_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    CLEAR_ERRORS
}
from '../constants/movieConstants';
import { useNavigate } from "react-router-dom";

// Get all movies
export const getMovies = (keyword="", currentPage=1, category, rating=0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_MOVIES_REQUEST
        })

        if(typeof(keyword) === 'string') {
            keyword=''
        } 

        else if(JSON.stringify(keyword) !== "{}") {
            keyword = keyword["keyword"]
        }


        let link;

        if(category) {
            link = `http://192.168.1.111:32002/api/fmovies/movies/all&page=${currentPage}&rating[gte]=${rating}&category=${category}`;
        }

        else {
            link = `http://192.168.1.111:32002/api/fmovies/movies/all?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}`;
        }

        let { data } = await axios.get(link);

        dispatch({
            type: ALL_MOVIES_SUCCESS,
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: ALL_MOVIES_FAIL,
            payload: error
        })
    }
};

export const getMovieDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: MOVIE_DETAILS_REQUEST});

        let { data } = await axios.get(`http://192.168.1.111:32002/api/fmovies/movie/${id}`);

        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: MOVIE_DETAILS_FAIL,
            payload: error
        })
    }
}

export const uploadMovie = (movieData) => async (dispatch) => {
    try{
        dispatch({type: ADD_MOVIE_REQUEST});

        movieData.cast = JSON.stringify(movieData.cast)

        const movieDataMain = {
            category: movieData.category,
            family: movieData.family,
            hd: movieData.hd,
            length: movieData.length,
            name: movieData.name,
            server_name: movieData.server_name,
            server_url: movieData.server_url,
            poster: movieData.poster,
            cover: movieData.cover,
            cast: movieData.cast,
            country: movieData.country,
            director: movieData.director,
            production: movieData.production,
            release: movieData.release,
            description: movieData.description,
        };

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post('http://192.168.1.111:32002/api/fmovies/movie/new', movieDataMain, config);

        dispatch({
            type: ADD_MOVIE_SUCCESS,
            payload: data
        })
    }
    catch(error) {
        dispatch({
            type: ADD_MOVIE_FAIL,
            payload: error
        })
    }
}

// To clear the errors
export const clearErrors = async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}