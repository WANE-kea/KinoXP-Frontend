import { useEffect, useState } from "react";
import { Movie } from "../models/interfaces";
import { getAllMovies } from "../services/apiFacade";
import BuyTicketsButton from "./BuyTicketsButton";

export default function MovieGrid({ handleTicketPurchase, showMovieInfo }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then((res) => setMovies(res));
  }, []);

  return (
    <div className="movie-grid">
      {movies.map((movie: Movie) => (
        <div key={movie.id} className="movie-card">
          {movie.posterBase64 ? (
            <img
              src={movie.posterBase64}
              alt={movie.title}
              style={{ width: "50%" }}
              onClick={() => showMovieInfo(movie.id)}
            />
          ) : (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="move-image"
              style={{ width: "50%" }}
              onClick={() => showMovieInfo(movie.id)}
            />
          )}
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>
            Categories:{" "}
            {movie.categories.map((category) => (
              <span key={category + movie.id}>{category} </span>
            ))}
          </p>
          <BuyTicketsButton handleTicketPurchase={handleTicketPurchase} showId={movie.id} />
          <button onClick={() => showMovieInfo(movie.id)}>More info</button>
          <button onClick={() => handleTicketPurchase(movie.id)}>Buy tickets</button>
        </div>
      ))}
    </div>
  );
}
