import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import SearchCards from '../SearchCards/SearchCards'

function Header() {

  const[searchMovie,setSearchMovie] = useState("");

  return (
    <div className='header'>
        <div className="header-left">
            <Link to="/" className='header__Link'><img className='header__icon' src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/imdb-icon.png" alt="logo"/></Link>
            <Link to="/movies/popular"  className='header__Link'>POPULAR</Link>
            <Link to="/movies/upcoming"  className='header__Link'>UPCOMING</Link>
            <Link to="/movies/top_rated"  className='header__Link'>TOP RATED</Link>
        </div>
        <div className="header-right">
           <input type="search" onChange={(e)=>setSearchMovie(e.target.value)} value={searchMovie} placeholder='search here....'/>
           <div className="searchList">
              <SearchCards query={searchMovie}/>
           </div>
           
        </div>
    </div>
  )
}

export default Header