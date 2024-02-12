import './Card.css';

const Card = ({ movie }) => {
    return (
        <>
            <div className="card-main-container">
                <img src={movie.images[0].url} alt="" />
                <div className="card-details-container">
                    <p>{movie.release.slice(0,4)}</p>
                    <p>{movie.length}min</p>
                </div>
                <h5>{movie.name}</h5>
            </div>
        </>
    )
}

export default Card