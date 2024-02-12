import React from 'react'
import './CarouselCardMini.css';
import { AiFillStar } from "react-icons/ai";

const CarouselCardMini = ({ product }) => {
    return (
        <>
            {
                product === undefined ? (<h1>Loading</h1>):
                (
                    <div className="mini-carousel-card-container-main" style={{backgroundImage: `url(${product.image_url})`}}>
                        <div className="first-div-mini-carousel">
                            <h4>{product.name}</h4>
                            <p><AiFillStar />{product.rating}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CarouselCardMini