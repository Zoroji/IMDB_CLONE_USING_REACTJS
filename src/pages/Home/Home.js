import React, { useEffect, useState } from 'react'
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../../component/movieList/MovieList';

function Home() {

    const [popularMovies,setPopularMovies] = useState([])

    useEffect(()=>{

        fetch("https://api.themoviedb.org/3/movie/popular?api_key=6ce4451f3f0ec94396022f9a23dd68a0&language=en-US")
        .then((res)=>res.json())
        .then(data => setPopularMovies(data.results))

    },[])


  return (
    <>
    <div className='hero'>
          <Carousel showThumbs={false} autoPlay={true} transitionTime={2} showStatus={false} infiniteLoop={true}>
                
                {popularMovies.map((movie)=>(
                  <Link style={{textDecoration:'none',color:'white'}} to={`/movie/${movie.id}`}>
                  <div key={movie.id} className="slide-container">
                  
            <div className="poster_img">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='movie' />
            </div>
            <div className="poster_img__overlay">
              <div className="poster_img__title">
                {movie.original_title}
              </div>
              <div className="poster_img__date">
                {movie.release_date}
                <span className='poster_img__rating'>
                {movie.vote_average}
                  <i className='fa-solid fa-star'></i>
                </span>
              </div>
              <div className="poster_img__description">
                {movie.overview}
              </div>
            </div>
        </div>
        </Link>
                ))}
               
                
            </Carousel>
    </div>


    <MovieList/>

    </>
  )
}

export default Home;