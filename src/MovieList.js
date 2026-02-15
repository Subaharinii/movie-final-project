import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "https://movie-final-project-task.onrender.com";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`${API}/api/movies`);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Movies</h1>

      <div className="grid">
        {movies.map(movie => (
          <div key={movie.id} className="card">
            <h2>{movie.title}</h2>
            <p>{movie.tagline}</p>
            <p><strong>{movie.vote_average}/10</strong></p>
            <Link to={`/movie/${movie.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
