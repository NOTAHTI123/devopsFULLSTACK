import { useEffect, useLayoutEffect, useState } from 'react';
import './LandingPage.css';

import Carousel from '../Carousel/Carousel';
import MiniCarousel from '../Carousel/MiniCarousel';
import { AiOutlineFire, AiFillPlaySquare } from "react-icons/ai";
import Loading from '../Layouts/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../actions/movieAction';
import Card from '../Layouts/Loading/Card';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';


const LandingPage = () => {
    const { loading, movies } = useSelector(state => state.movies);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getMovies());
        document.getElementById('root').style.backgroundColor = '#181818';
    }, [dispatch])

    const setActive = (e) => {
        document.querySelectorAll('.button-standard-type-landing-page').forEach(element => element.classList.remove('active'));

        document.getElementById(e.target.id).classList.add('active');

        // After This I will fetch related content from DB
    }
    

    return (
        <>
            {
                loading ? (<Loading />): (
                    <div className="landing-page-container-main">
                    <MetaData title={'Fmovies Home'} />
                        <Carousel movies={movies} />
                
                        <div className="mini-carousel-landing-page">
                            <h3><AiOutlineFire />Trending Now<AiOutlineFire /></h3>
                            <MiniCarousel movies={ movies } />
                        </div>

                        <section className='recommended-section'>
                            <div className="recommended-section-heading-button">
                                <div className="recommended-section-basic">
                                    <div className="basic-recommended-sec-1">
                                        <AiFillPlaySquare className='recommended-logo' />
                                        <h1>RECOMMENDED</h1>
                                    </div>

                                    <div className="recommended-buttons">
                                        <button id={'Movies'} className='button-standard-type-landing-page Movies-button active' onClick={setActive}>Movies</button>
                                        <button id={'Tv Shows'} className={'button-standard-type-landing-page Tv-shows-button'} onClick={setActive}>Tv Shows</button>
                                    </div>
                                </div>

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
                        </section>
                    </div>
                )
            }
        </>
    )
}

export default LandingPage