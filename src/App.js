
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './component/header/Header';
import Home from './pages/Home/Home';
import MovieList from './component/movieList/MovieList';
import MovieDetails from './pages/movieDetails/MovieDetails';

function App() {
  return (
  
    <div className='App' >
      <Router>
      <Header/>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="movie/:id" element={<MovieDetails/>}></Route>
        <Route path="movies/:type" element={<MovieList/>}></Route>
        <Route path="/*" element={<h1>ERROR PAGE</h1>}></Route>
      </Routes>
         </Router>
        
    </div>
      );
}

export default App;
