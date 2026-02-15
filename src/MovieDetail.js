import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://movie-final-project-task.onrender.com";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>Back</button>
      <h1>{movie.title}</h1>
      <p><i>{movie.tagline}</i></p>
      <p><strong>Release:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Status:</strong> {movie.status}</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
