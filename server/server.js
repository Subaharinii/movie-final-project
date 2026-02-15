const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Load movies data
const moviesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf8")
);

// GET /api/movies
app.get("/api/movies", (req, res) => {
  const movies = moviesData.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));
  res.json(movies);
});

// GET /api/movies/:id
app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = moviesData.find(m => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
