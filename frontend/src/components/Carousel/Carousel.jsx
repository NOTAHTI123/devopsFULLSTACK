import { useEffect, useState } from 'react';
import './Carousel.css';

import { CgArrowLeft } from "react-icons/cg";
import { CgArrowRight } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";




const Carousel = ({ movies }) => {
    const [curr, setCurr] = useState(0);
    const [currObject, setCurrObject] = useState(movies[curr]);

    useEffect(() => {
        setCurrObject(movies[curr])


        const intervalId = setInterval(() => {
            document.querySelector('.carousel-container-main > img').classList.add('hidden');
            
            setTimeout(() => {
                nextImage();
                document.querySelector('.carousel-container-main > img').classList.remove('hidden');
            }, 500)
        }, 5000)


        return () => {
            clearInterval(intervalId);
        }

    }, [movies, curr])

    function nextImage() {
        if(movies.length === 1) {
        }
        else if(curr < movies.length-1) {
            setCurr(curr + 1);
            setCurrObject(movies[curr]);
        }
        else {
            setCurr(0);
            setCurrObject(movies[curr]);
        }
        animation();
    }

    function previousImage() {
        if(curr > 0) {
            setCurr(curr-1);
            setCurrObject(movies[curr]);
        }
        else {
            setCurr(0);
            setCurrObject(movies[curr]);
        }
        animation();
    }

    function animation () {
        document.querySelector('.carousel-container-main > img').classList.add('hidden');

        setTimeout(() => {
            document.querySelector('.carousel-container-main > img').classList.remove('hidden');
        }, 500)
    }

    return (
        <>
            {
                currObject === undefined ? (<h1>Loading</h1>):(
                    <>
                        <div className="carousel-container-main">
                            <div className="carousel-movie-details">
                                <h1>{currObject.name}</h1>
                                <div className="carousel-movie-details-inline">
                                    <p>{currObject.hd ? "HD" : "SD"}</p>
                                    <p><AiFillStar />{currObject.rating}</p>
                                    <p>{currObject.length} min</p>
                                    <p>{currObject.type}</p>
                                    <p>{currObject.family ? 'Family' : 'PG'}</p>
                                </div>
                                <div className='details-container-carousel'>
                                    <p className='details-movie-details'>{currObject.details}</p>
                                </div>
                            <a className='watch-now-button-carousel' href={`/watch/${currObject._id}`}><AiFillPlayCircle />Watch Now</a>
                            </div>
                            <img src={currObject.images[1].url} alt="" />
                        </div>
                        <div className="next-previous-options-carousel">
                            <button className='previous-button' onClick={previousImage}><CgArrowLeft /></button>
                            <button className='next-button' onClick={nextImage}><CgArrowRight /></button>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Carousel