import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { movieReducer } from './reducers/movieReducer.js';

const reducer = combineReducers({
    movies: movieReducer
});

let initialState = {
    loading: false,
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;