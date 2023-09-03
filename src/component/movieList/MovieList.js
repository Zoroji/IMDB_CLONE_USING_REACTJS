import React, { useEffect, useState } from 'react';
import "./MovieList.css"
import { useParams } from 'react-router-dom';
import Card from '../card/Card';

export default function MovieList() {

    const [currentPage, setCurrentpage] = useState(1);
    const [movieList, setMovieList] = useState([]);

    const { type } = useParams();

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?api_key=6ce4451f3f0ec94396022f9a23dd68a0&language=en-US&page=${currentPage}`)
            .then((res) => res.json())
            .then((data) => { setMovieList(data.results) })
    }


    const loadMore = () => {
        const nextpage = currentPage + 1;

        try {
            fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?api_key=6ce4451f3f0ec94396022f9a23dd68a0&language=en-US&page=${nextpage}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results.length > 0) {
                        setMovieList((prevMovieList) => [...prevMovieList, ...data.results]);
                        setCurrentpage(nextpage);
                    }
                    else {
                        console.log("reached the end of page");
                    }
                })
        } catch (error) {
            console.log(error);
        }



    }

    return (
        <div className='movie_list'>
            <div className="movie_list__type">{(type ? type : 'popular').toUpperCase()}</div>
            <div className="movie_list__cards">
                {
                    movieList.map((movie) => (
                        <Card movie={movie} />
                    ))
                }
            </div>
            <button className='btn-load-more' onClick={loadMore}>More</button>
        </div>
    )
}
