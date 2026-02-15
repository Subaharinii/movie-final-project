import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-list">
      <h1>Movie Listing</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p className="tagline">{movie.tagline || 'No tagline available'}</p>
            <p className="rating">Rating: {movie.vote_average}/10</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
