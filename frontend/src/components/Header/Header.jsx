import './Header.css';
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import FMOVIESLOGO from '../../assets/images/fmovies-logo.png';
import { CgArrowRight } from "react-icons/cg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = () => {
        if (searchQuery) {
            navigate(`/pk/content/results/${searchQuery}`)
        }
    }

    return (
        <>
            <div className="header-container-main">
                <div className="first-div-header">
                    {/* <a href="/pk"><img src={FMOVIESLOGO} alt="" /></a> */}
                </div>
                <div className="search-div-header">
                    <input type="text" placeholder='Search movies...' onChange={handleChange} />
                    <CiSearch className='search-button-search-div' onClick={handleSearch} />
                </div>

                <button className='loginButton-header'>Login<CgArrowRight /></button>
            </div>
        </>
    )
}

export default Header