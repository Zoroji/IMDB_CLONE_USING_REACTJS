import React, { useEffect, useState } from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import "./Card.css";
import { Link } from 'react-router-dom';


export default function Card({movie}) {

    const [buffering,setBuffering] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setBuffering(false)
        },2000)
    },[])

  return ( 
    <>
        {
            buffering ?
            <div className='cards '>
            <SkeletonTheme color="#131212" highlightColor="#0b0b0b">
                    <Skeleton height={300} duration={2} />
                </SkeletonTheme>
                </div>
            :
            <Link style={{textDecoration:'none',color:'white'}} to={`/movie/${movie.id}`}>
            <div className="cards">
                <img className='card__img' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                <div className="card__overlay">
                   
                    <div className="card__title">{movie.title}</div>

                    <div className="card__date">
                    {movie.release_date}
                <span className='poster_img__rating'>
                {movie.vote_average}
                  <i className='fa-solid fa-star'></i>
                </span>
                    </div>

                <div className="card__description">{movie.overview.slice(0,80)+"...."}</div>

                </div>
            </div>

            </Link>
        }

    </>
  )
}
