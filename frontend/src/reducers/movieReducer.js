import {
    ALL_MOVIES_REQUEST,
    ALL_MOVIES_SUCCESS,
    ALL_MOVIES_FAIL,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    CLEAR_ERRORS,
    ADD_MOVIE_REQUEST,
    ADD_MOVIE_SUCCESS,
    ADD_MOVIE_FAIL
}
from '../constants/movieConstants';

export const movieReducer = (state={ movies: [] }, action) => {
    switch(action.type) {
        case ALL_MOVIES_REQUEST:
        case MOVIE_DETAILS_REQUEST:
            return {
                loading: true,
                movies: []
            };
        
        case ALL_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload.movies
            };
        
        case MOVIE_DETAILS_SUCCESS:
            return {
                loading: false,
                movie: action.payload.movie
            }
        
        case ALL_MOVIES_FAIL:
        case ADD_MOVIE_FAIL:
        case MOVIE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        
        case ADD_MOVIE_REQUEST: 
            return {
                loading: true,
                submitSuccess: false,
                movie: {}
            };

        case ADD_MOVIE_SUCCESS: 
            return {
                loading: false,
                submitSuccess: true,
                movie: action.payload
            };

        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        
        default:
            return state;
    }
}