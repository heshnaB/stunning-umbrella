import Hero from './Hero';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const MovieView = () => {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?&language=en-US&api_key=c86b51d87a560e3d0df90223466b2427`)
            .then(response => response.json())
            .then(data => {
                setMovieDetails(data)
                setIsLoading(false)
            })
    }, [id])

    function renderMovieDetails() {
        if(isLoading) {
            return <Hero text="Loading..." />
        }

        if(movieDetails) {
            // Put code if an image is missing in here.
            const posterPath = movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image+Available';

            const backdropUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
            
            return (
                <>
                    <Hero text ={movieDetails.original_title} backdrop={backdropUrl} />
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={posterPath} alt="..." className="img-fluid shadow rounded"/>
                            </div>
                            <div className="col-md-9">
                                <h2>{movieDetails.original_title}</h2>
                                <p className="lead">
                                    {movieDetails.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    

    return renderMovieDetails()
};

export default MovieView ;