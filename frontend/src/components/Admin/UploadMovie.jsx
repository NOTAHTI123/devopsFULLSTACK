import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UploadMovie.css';
import { uploadMovie } from '../../actions/movieAction';

import Loading from '../Layouts/Loading/Loading';
import MetaData from '../Layouts/MetaData';

const UploadMovie = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let { loading, submitSuccess } = useSelector(state => state.movies)

    const [form, setForm] = useState({});

    useEffect(() => {
        document.querySelector('.search-div-header').style.visibility = 'hidden';
        document.querySelector('.loginButton-header').style.visibility = 'hidden';
    }, [])

    const handleChange = (e) => {
        if(e.target.name === 'poster-movie-upload') {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setForm({
                        ...form,
                        poster: reader.result
                    })
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }

        else if(e.target.name === 'cover-movie-upload') {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setForm({
                        ...form,
                        cover: reader.result
                    })
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }

        else if (e.target.className === 'hd-movie-upload') {
            const hdValue = e.target.value === 'true' ? 1 : 0;
            setForm({
                ...form,
                hd: hdValue
            });
        }

        else if (e.target.className === 'family-movie-upload') {
            const familyValue = e.target.value === 'true' ? 1 : 0;
            setForm({
                ...form,
                family: familyValue
            });
        }
        
        else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const [cast, setCast] = useState([]);

    const handleCast = () => {
        setCast([
            ...cast,
            {
                name: document.querySelector('.cast-upload-movie').value
            }
        ])

        document.querySelector('.cast-upload-movie').value = ''
    }

    useEffect(() => {
        setForm({
            ...form,
            cast: cast
        })
    }, [cast])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // console.log(form)

        dispatch(uploadMovie(form));
    }

    useEffect(() => {
        if(window.innerWidth <= 740) {
            navigate('/pk')
        }

        if(submitSuccess) {
            navigate('/pk')
        }
    }, [navigate, submitSuccess])

    return (
        <>
            {
                loading ? (<Loading />): (
                    <form className="main-container-upload-movie" onSubmit={handleSubmit}>
                        <MetaData title={`Upload`} />
                
                <div className="main-div-upload-movie">
                    <div className="basic-details-upload-movie">
                        <h2>Basic Details</h2>
                            <div className="name-basic-details-upload-movie">
                                <div className="name-details-first-div-movie-upload">
                                    <h3>Name:</h3>
                                    <input type="text" name="name" id="" required onChange={handleChange} />
                                </div>

                                <div className="category-basic-details-upload-movie">
                                        <h3>Category:</h3>
                                    <input type="text" name="category" id="" required onChange={handleChange} />
                                </div>
                            </div>

                        <div className="length-basic-details-upload-movie">
                            <h3>Length:</h3>
                            <input type="text" name="length" id="" required onChange={handleChange} />
                        </div>

                        <div className="description-basic-details-upload-movie">
                            <h3>Description:</h3>
                            <textarea rows={10} type="text" name="description" id="" required onChange={handleChange} />
                        </div>

                        <div className="hd-option-movie-upload">
                            <h3>HD: </h3>
                            <select className="hd-movie-upload" name="" id="" onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">no</option>
                            </select>
                        </div>

                        <div className="family-option-movie-upload">
                            <h3>Family: </h3>
                            <select className="family-movie-upload" name="" id="" onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">no</option>
                            </select>
                        </div>

                        
                    </div>

                    <div className="server-details-upload-movie">
                        <h2>Server Details</h2>
                        <div className="server-main-details-movie-upload">
                            <h3>Name:</h3>
                            <input name='server_name' type="text" required onChange={handleChange} />
                        </div>
    
                        <div className="server-main-details-movie-upload">
                            <h3>Url:</h3>
                            <input name='server_url' type="text" required onChange={handleChange} />
                        </div>
                        
                    </div>
                    
                    <div className="advanced-details-upload-movie">
                        <div className="country-main-details-movie-upload">
                            <h3>Country:</h3>
                            <input name='country' type="text" required onChange={handleChange} />
                        </div>
                        <div className="release-main-details-movie-upload">
                            <h3>Release:</h3>
                            <input name='release' type='date' required onChange={handleChange} />
                        </div>
                        <div className="director-main-details-movie-upload">
                            <h3>Director:</h3>
                            <input name='director' type="text" required onChange={handleChange} />
                        </div>
                        <div className="production-main-details-movie-upload">
                            <h3>Production:</h3>
                            <input name='production' type="text" required onChange={handleChange} />
                        </div>
                        <div className="cast-main-details-movie-upload">
                            <h3>Cast:</h3>
                            <input name='cast' type="text" className='cast-upload-movie' />
                            <input value={'Add'} type="button" onClick={handleCast} />
                        </div>
                        <div className="images-upload-movie">
                            <h2>Images</h2>
                            <div className="final-div-upload-movie">
                                <h3>Poster</h3>
                                <input type="file" name="poster-movie-upload" id="" required onChange={handleChange} />
                            </div>
                            <div className="final-div-upload-movie">
                                <h3>Cover</h3>
                                <input type="file" name="cover-movie-upload" id="" required onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <input type='submit' className='upload-button-upload-movie' value={'Submit'} />
            </form>
                )
            }
        </>
    )
}

export default UploadMovie