import React from 'react';
import Hero from './Hero';
import {Link} from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image+Available';

    const detailUrl = `/movies/${movie.id}`

    return (
        <div className="col-lg-3 col-md-3 col-2 my-4">
            <div className="card">
                <img src={posterUrl} className="card-img-top" alt={movie.original_title}/>
                <div className="card-body">
                    <h5 className="card-title">{movie.original_title}</h5>
                    <Link to={detailUrl} className="btn btn-primary">Show details</Link>
                </div>
            </div>
        </div>
    )
}


const SearchView = ({ keyword, searchResults }) => {
    const title = `You are searching for ${keyword}`

    let resultsHtml;
    if (searchResults && searchResults.length > 0) {
        resultsHtml = searchResults.map((obj, i) => (
            <MovieCard movie={obj} key={i}/>
        ));
    } else {
        resultsHtml = `No results for ${keyword}`
    }
    
    return(
        <>
            <Hero text={title}/>
            {resultsHtml &&
                <div className="container">
                    <div className="row">
                        {resultsHtml}
                    </div>
                </div>
            }
        </>
    )
}

export default SearchView;