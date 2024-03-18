import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../services/interfaces";

export default function MovieGrid() {
    const [movies, setMovies] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getMovies().then((res)=>setMovies(res));
    }, [])

    const showMovieInfo = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }

    const handleTicketPurchase = (movieId: number) => {
        navigate(`/booking/${movieId}`);
    }

    return (
        <section className="movie-grid">
            {movies.map((movie:Movie) => (
                <section key={movie.id} className="movie-card">
                    <img src={movie.posterUrl ? movie.posterUrl : movie.posterBase64} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    {movie.categories.map((category) => (
                        <p key={category + movie.title}>{category}</p>
                    ))}
                    <p>{movie.description}</p>
                    <button onClick={()=>showMovieInfo(movie.id)}>More Info</button>
                    <button onClick={()=>handleTicketPurchase(movie.id)}>Buy Tickets</button>
                </section>
            ))}
        </section>
    );
};
