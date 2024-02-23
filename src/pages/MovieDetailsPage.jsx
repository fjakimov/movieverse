import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieDetailsHome from '../components/Movies/MovieDetails/MovieDetailsHome';
import YoutubeTrailer from '../components/Movies/MovieDetails/YoutubeTrailer';
import MovieFacts from '../components/Movies/MovieDetails/MovieFacts';
import MovieComments from '../components/Movies/MovieDetails/MovieComments';

function MovieDetailsPage({movieverseUser}) {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovieDetails = async (movieId) => {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

    return fetch(detailsUrl)
      .then(response => response.json())
      .then(movieDetails => {
        return movieDetails;
      })
      .catch(() => {
        console.error(`Error fetching movie details for movie with id: ${movieId}`);
        return null;
      });
  };

  useEffect(() => {
    getMovieDetails(id)
    .then(movieDetails => {setMovie(movieDetails)})
    .catch(error => {console.error('Error fetching movie details: ', error)});
  }, [])

  useEffect(() => {
    // Store the current URL in sessionStorage
    sessionStorage.setItem('prevUrl', window.location.pathname);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar movieverseUser={movieverseUser}/>
      <MovieDetailsHome movie={movie} movieverseUser={movieverseUser}/>
      <YoutubeTrailer title={movie.title}/>
      <MovieFacts movie={movie}/>
      <MovieComments item={movie} movieverseUser={movieverseUser}/>
      <Footer/>
    </>
  )
}

export default MovieDetailsPage;