import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./MovieDetails.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function MovieDetails() {

    const [movie, setMovie] = useState({});
    const [casts, setCasts] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [recommendation,setRecommendation] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6ce4451f3f0ec94396022f9a23dd68a0&language=en-US`)
            .then((res) => res.json())
            .then((data) => setMovie(data))


        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6ce4451f3f0ec94396022f9a23dd68a0`)
            .then((res) => res.json())
            .then((data) => setCasts(data.cast))

        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=6ce4451f3f0ec94396022f9a23dd68a0&language=en-US&page=1`)
        .then((res => res.json()))
        .then((data)=>setRecommendation(data.results))

    }, [id])


    const getMovieDuration = (min) => {

        const hours = Math.floor(min / 60);
        const remMin = Math.floor(min % 60);
        return `${hours}h ${remMin}min`
    }


    const handleSlide = (direction) => {
        const cardWidth = 500;
        const container = document.querySelector('.cast__container');
        const maxScroll = (casts.length - 4) * cardWidth;

        if (direction === 'left' && scrollPosition > 0) {
            const newScrollPosition = scrollPosition - cardWidth;
            setScrollPosition(newScrollPosition);
            container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        } else if (direction === 'right' && scrollPosition < maxScroll) {
            const newScrollPosition = scrollPosition + cardWidth;
            setScrollPosition(newScrollPosition);
            container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    };




    return (
        <div>
            {movie ? (
                <>
                    <div className="hero-container">
                        <div
                            className="hero"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                                backgroundPosition: 'right',
                                backgroundRepeat: 'repeat',
                                backgroundSize: 'contain',
                                filter: 'blur(2px)',

                            }}

                        ></div>
                        <div className="overlay">

                            <div className="overlay__card">
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="img" />
                            </div>
                            <div className="overlay__content">

                                <div className="overlay__content__heading">
                                    <h1 style={{ fontSize: '3rem', fontWeight: 'bolder' }}>{movie.title}</h1>
                                    <div className="subheading">
                                        <ul>
                                            <li>{movie.release_date}</li>
                                            <li>
                                                {movie.genres && movie.genres.map((genre) => (
                                                    <>
                                                        <span >{genre.name}</span>
                                                        <span>{" "}</span>
                                                    </>
                                                ))}
                                            </li>
                                            <li>{getMovieDuration(movie.runtime)}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="overlay__features">

                                    <div style={{ width: 70, height: 70, backgroundColor: 'black', borderRadius: '50%' }}>
                                        <CircularProgressbar value={movie.vote_average * 10}
                                            styles={{
                                                path: {
                                                    stroke: '#00ff00',
                                                },
                                                background: {
                                                    fill: '#230e0e',
                                                },
                                                textStyle: {
                                                    fontSize: '200px',
                                                },
                                            }}
                                            text={`${Math.floor(movie.vote_average * 10)} %`}
                                        />
                                    </div>
                                    <div style={{ fontSize: "14px", fontWeight: 'bolder', width: '1rem', }}>User Score</div>

                                    <div className="icon" style={{ lineHeight: '3rem' }}>
                                        <div class="fa fa-solid fa-heart fa-lg" style={{ color: "#ffffff" }}></div>
                                    </div>


                                </div>
                                <div className="overview">
                                    <div className='heading'>OVERVIEW</div>
                                    <div className='overview_subheading'>{movie.overview}</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="cast">
                        <div className="heading">Top Billed Cast</div>
                        <div className="button_group">
                            <button onClick={() => handleSlide('left')}>{'<<'}</button>
                            <button onClick={() => handleSlide('right')}>{'>>'}</button>

                        </div>
                        <div className="cast__container">
                            <div className="cast__deck">
                                {casts.map((cast) => (
                                    <div className="card">
                                        {cast.profile_path ? (
                                            <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt="" />
                                        ) : (
                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                                        )}

                                        <h3>{cast.name}</h3>
                                        <div style={{ color: ' rgb(92, 91, 93)' }}>{cast.character}</div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                    <div style={{'margin':"0.2rem 4rem"}} />
                <div className="recommendation-container">
                    <div className="heading">Recommendations</div>
                    <div className="card_deck">
                            {recommendation.slice(0,9).map((movie) => (
                                <Link key={movie.id} style={{textDecoration:'none',color:'white'}} to={`/movie/${movie.id}`}>
                                {console.log("movie:",movie.id)}
                                    <div className="card">
                                        {movie.poster_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                                        ) : (
                                            <img src="https://c8.alamy.com/comp/TT6Y40/3d-render-of-a-funny-cartoon-skeleton-character-maing-a-movie-with-a-clapperboard-TT6Y40.jpg" alt="" />
                                        )}

                                        <h3>{movie.title}</h3>
                                        <p>{Math.floor(movie.vote_average*10)}%</p>
                                    </div>
                                    </Link>
                                ))} 

                        
                    </div>
                </div>

                </>
            ) : (
                ''
            )}
        </div>
    )
}
