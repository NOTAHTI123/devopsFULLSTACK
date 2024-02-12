import React, { useEffect, useState } from 'react';
import './Watch.css';
import { useParams } from 'react-router-dom';
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineCloudServer } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../../actions/movieAction';
import Loading from '../Layouts/Loading/Loading';
import MetaData from '../Layouts/MetaData';


const Watch = () => {

    const { id } = useParams();
    const [backgroundImage, SetBackgroundImage] = useState('');
    const [leftImageVisibility, SetLeftImageVisibility] = useState('');

    const [servers, setServers] = useState([
        {
            id: '18D8VP',
            name: 'Vidplay',
        },
        {
            id: '18D9MC',
            name: 'MyCloud',
        },
        {
            id: '18E1FM',
            name: 'Filemoon',
        },
    ]);

    const setActiveServer = (e) => {
        document.querySelectorAll('.change-server-watch-page').forEach(button => {
            button.classList.remove('active');
        });

        e.currentTarget.classList.add('active');
    }

    const dispatch = useDispatch();
    const { movies, loading, movie } = useSelector(state => state.movies)

    useEffect(() => {
        dispatch(getMovieDetails(id));
        document.querySelector('.header-container-main').style.backgroundColor = 'black';
    }, [dispatch, id])

    useEffect(() => {
        if(movie) {
            const releaseDate = new Date(movie.release);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedReleaseDate = releaseDate.toLocaleDateString('en-US', options);
            setDate(formattedReleaseDate); 

        }
        const handleResize = () => {
            if(movie) {
                const imageUrl = window.innerWidth <= 965 ? movie.images[0].url : '';
                SetBackgroundImage(imageUrl);
                window.innerWidth <= 965 ? SetLeftImageVisibility('hide') : SetLeftImageVisibility('');
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [movie, backgroundImage])

    function hideImage() {
        document.getElementById('initial-cover-image-watch-page').style.display = 'none';
        document.getElementById('play-button').style.display = 'none';
        document.getElementById('video-tab-watch-video').style.display = 'block';
        document.getElementById('watch-container-1').classList.remove('main');
    }

    const [date, setDate] = useState();

    return (
        <>
            {
                loading || !movie ? (<Loading />): (
                    <div className='main-watch-container'>
                        <MetaData title={`${movie.name} Fmovies`} />
            <div className="parent-watch-container-1">
                <div id='watch-container-1' className='watch-container-1 main'>
                    <img id='initial-cover-image-watch-page' className='initial-cover-image-watch-page' src={movie.images[1].url} alt="" />
                    <video id='video-tab-watch-video' className='video-tab-watch-video hidden' 
                        controls
                        controlsList="nodownload" 
                    >
                        <source src={movie.servers[0].url} type="video/mp4" />
                    </video>
                    <AiFillPlayCircle onClick={hideImage} id='play-button' className='play-button' />
                </div>
            </div>
            <div className="watch-container-2">
                <p>If current server doesn&apos;t work please try other server below.</p>
                <div className="servers-available">
                    {
                        servers.map(sv => (
                            <button onClick={setActiveServer} className={sv.name === 'Vidplay' ? 'change-server-watch-page active' : 'change-server-watch-page'} key={sv.id}>
                                <p className='color-standard'>{sv.name}</p>
                                <AiOutlineCloudServer className='color-standard' />
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="watch-container-3" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className={`left-div-watch-container-3 ${leftImageVisibility}`}>
                    <div className="left-left-div-watch-container-3">
                        <img src={movie.images[0].url} alt="" />
                    </div>
                </div>
                <div className="middle-div-watch-container-3">
                    <div className="first-div-middle-div-watch-container-3">
                        <div className="rating-details-middle-div-watch-container-3">
                            <h2>{movie.name}</h2>
                            <ReactStars
                                count={5}
                                size={24}
                                activeColor="#00acc1"
                                value={movie.rating}
                                isHalf={true}
                                edit={false}
                            />
                        </div>
                        <div className="basic-details-middle-div-watch-container-3">
                            <p className='hd-logo-watch-page'>{movie.hd ? 'HD' : 'SD'}</p>
                            <p className='parental-guidance-logo-watch-page'>{!movie.family ? 'PG' : 'Family'}</p>
                            <p>2023</p>
                            <p>116 min</p>
                            <p><AiFillStar /> {movie.rating}</p>
                        </div>
                        
                        
                    </div>

                    <div className='second-div-middle-div-watch-container-3'>
                        <p>{movie.description}</p>
                        <div className="depth-details-second-div">
                            <p>Category:&nbsp;<span>{movie.category}</span></p>
                            <p>Country:&nbsp;<span>{movie.country}</span></p>
                            <p>Genre:&nbsp;<span>{movie.category}</span></p>
                            <p>Release:&nbsp;<span>{date}</span></p>
                            <p>Director:&nbsp;<span>{movie.director}</span></p>
                            <p>Production:&nbsp;<span>{movie.production}</span></p>
                            <p>Cast:&nbsp;{
                                movie.cast.map((cst, index) => (
                                    <span key={cst._id}>{cst.name}{index < movie.cast.length-1 ? ',' : ''}&nbsp;</span>
                                ))
                            }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                )
            }
        </>
    )
}

export default Watch