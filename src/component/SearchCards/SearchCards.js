import React, { useEffect, useState } from 'react'
import "./SearchCard.css";
import {Link} from "react-router-dom";


function SearchCards({ query }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=6ce4451f3f0ec94396022f9a23dd68a0&query=${query}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
    }, [query])



    return (
        <>

            {
                movies ?
                    movies.map((movie) => (
                        <>
                        <Link style={{textDecoration:"none",color:"inherit"}} to={`/movie/${movie.id}`}>
                            <div className="movieCard">
                                {movie.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                                ) : (
                                    <img src="https://c8.alamy.com/comp/TT6Y40/3d-render-of-a-funny-cartoon-skeleton-character-maing-a-movie-with-a-clapperboard-TT6Y40.jpg" alt="" />
                                )}
                                
                                <div className="movieCard__title">{movie.title}</div>
                            </div>
                            </Link>
                        </>
                    ))
                    : ''
            }
        </>
    )
}

export default SearchCards;