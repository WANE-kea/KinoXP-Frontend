import { useEffect, useState } from "react";
import { getAllShows } from "../services/apiFacade";
import { Show } from "../models/interfaces";
import "./ShowtimesButton.css";

export default function ShowtimesButton({ movieId, handleTicketPurchase }) {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    getAllShows().then((res) => {
      const movieShows = res.filter((show) => show.movie.id === movieId);
      setShows(movieShows);
    });
  }, [movieId]);

  // Group shows by date
  const showsByDate = shows.reduce((groups, show) => {
    const date = new Date(show.startTime).toLocaleDateString("en-GB");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(show);
    return groups;
  }, {});

  return (
    <div className="showtimes-button">
      {Object.entries(showsByDate).map(([date, shows]) => (
        <div key={date}>
          <h2>{date}</h2>
          <div className="show-row">
            {(shows as Show[]).map((show) => (
              <button key={show.id} onClick={() => handleTicketPurchase(show.id)} className="showtimes-button">
                <div>
                  {new Date(show.startTime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </div>{" "}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
