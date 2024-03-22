import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

export default function UpcomingMoviesPage() {
  const navigate = useNavigate();

  const showMovieInfo = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleTicketPurchase = (movieId: number) => {
    navigate(`/shows/${movieId}`, { state: { movieId } });
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Upcoming movies</h1>
        <MovieGrid showMovieInfo={showMovieInfo} handleTicketPurchase={handleTicketPurchase} />
      </div>
    </>
  );
}
