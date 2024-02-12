import { useDispatch, useSelector } from 'react-redux';
import './Results.css';
import { useEffect } from 'react';
import Loading from '../Layouts/Loading/Loading';
import { getMovies } from '../../actions/movieAction';
import { Link, useParams } from 'react-router-dom';
import Card from '../Layouts/Loading/Card';
import MetaData from '../Layouts/MetaData';

const Results = () => {

    const dispatch = useDispatch();

    const { loading, movies } = useSelector(state => state.movies);

    const { keyword } = useParams();

    useEffect(() => {
        dispatch(getMovies({keyword: keyword}))
    }, [dispatch, keyword])

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <>
                        <div className="main-div-results-page">
                            <MetaData title={`Search Results for ${keyword} Fmovies`} />
                            <h1>{movies.length > 0 ? `Search results for "${keyword}"` : 'Not found'}</h1>
                                <div className="recommended-section-content">
                                    {
                                        movies.map(movie => (
                                            <Link to={`/watch/${movie._id}`} style={{textDecoration: 'none'}} key={movie._id}>
                                                <Card key={movie._id} movie={movie} />
                                            </Link>
                                        ))
                                    }
                                </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Results