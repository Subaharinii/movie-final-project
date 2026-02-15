import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "https://movie-final-project-task.onrender.com";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/movies`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

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
