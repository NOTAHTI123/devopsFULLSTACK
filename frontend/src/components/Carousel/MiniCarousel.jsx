import CarouselCardMini from './CarouselCardMini';
import './MiniCarousel.css';

import React, { useEffect, useState } from 'react';
import { CgArrowLeft } from "react-icons/cg";
import { CgArrowRight } from "react-icons/cg";

import { AiFillStar, AiOutlineArrowLeft } from "react-icons/ai";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../Layouts/Loading/Loading';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 1 
    },
    mobile: {
        breakpoint: { max: 767, min: 220 },
        items: 1,
        slidesToSlide: 1 
    }
};

const MiniCarousel = () => {
    
    const { movies, loading } = useSelector(state => state.movies)

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <div className="first-main-container-mini-carousel">
                        <Carousel
                            responsive={responsive}
                            autoPlay={true}
                            autoPlaySpeed={5500}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            partialVisible={false}
                            dotListClass="custom-dot-list-style"
                            removeArrowOnDeviceType={["tablet", "mobile"]}

                            className='mini-carousel-container'
                        >
                            {
                                movies.map(mov => (
                                    <Link key={mov._id} className='clickable-mini-carousel-item' to={`/watch/${mov._id}`}>
                                        <div className='mini-carousel-item' style={{backgroundImage: `url(${mov.images[1].url})`}}>
                                            <div className='div-mini-carousel-item'>
                                                <h3>{mov.name}</h3>
                                                <p><AiFillStar />{mov.rating}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </Carousel>
                    </div>
                )
            }
        </>
    )
}

export default MiniCarousel