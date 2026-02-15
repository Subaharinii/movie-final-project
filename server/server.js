const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Load movies data once at startup
const moviesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf8")
);

// GET /api/movies - Return list of movies with limited fields
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
  const movies = moviesData.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));
  response.json(movies);
});

// GET /api/movies/:id - Return full movie object
app.get("/api/movies/:id", (request, response) => {
  console.log("❇️ Received GET request to /api/movies/" + request.params.id);
  const movieId = parseInt(request.params.id);
  const movie = moviesData.find(m => m.id === movieId);
  
  if (movie) {
    response.json(movie);
  } else {
    response.status(404).json({ error: "Movie not found" });
  }
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
