import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

export default function UpcomingMoviesPage() {
  const navigate = useNavigate();

  const showMovieInfo = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleTicketPurchase = (movieId: number) => {
    navigate(`/shows/${movieId}`);
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Upcoming Movies</h1>
        <p>Here you will find a list of movies that will be screened in the cinema in the near future.</p>
      </div>
      <MovieGrid showMovieInfo={showMovieInfo} handleTicketPurchase={handleTicketPurchase} />
    </>
  );
}
