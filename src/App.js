import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import apiConfig from './api/apiConfig';
import Home from './components/home/Home';
import Layout from './Layout';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await apiConfig.get("/api/v1/movies");
      console.log(response);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await apiConfig.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }
  return (
    <div className='App'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
          <Route path='/' element={<Home movies={movies} /> } />
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />} />
          <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          </Route>
          
        </Routes> 
      </BrowserRouter>

    </div>
  );
}

export default App;
