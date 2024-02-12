import './AllMovies.css';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { getMovies } from '../../actions/movieAction';
import Loading from '../Layouts/Loading/Loading';
import { useParams } from 'react-router-dom';

const AllMovies = () => {

    const dispatch = useDispatch();

    const keyword = useParams();

    useEffect(() => {
        dispatch(getMovies(keyword));
    }, [dispatch, keyword])

    const { movies, loading } = useSelector(state => state.movies);

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <>
                        {
                            movies.map(mov => (
                                <h1 key={mov._id}>{mov.name}</h1>
                            ))
                        }
                    </>
                )
            }
        </>
    )
}

export default AllMovies