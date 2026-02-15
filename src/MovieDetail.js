import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`/api/movies/${id}`);

        if (!response.ok) {
          throw new Error('Movie not found');
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-detail">
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Back to Movies
      </button>

      <h1>{movie.title}</h1>

      {movie.tagline && (
        <p className="tagline">"{movie.tagline}"</p>
      )}

      <div className="movie-info">
        <p><strong>Original Title:</strong> {movie.original_title}</p>
        <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Status:</strong> {movie.status}</p>
        <p><strong>Rating:</strong> {movie.vote_average}/10 ({movie.vote_count} votes)</p>
      </div>

      <div className="overview">
        <h2>Overview</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
