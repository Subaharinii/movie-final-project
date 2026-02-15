const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Load movies data once at startup
const moviesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf8")
);

// GET /api/movies - limited fields
app.get("/api/movies", (req, res) => {
  const movies = moviesData.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));
  res.json(movies);
});

// GET /api/movies/:id - full movie
app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = moviesData.find(m => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
