import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getMovieById } from "../services/apiFacade";
import { Movie } from "../services/interfaces";

export default function MoviePage(){
    const { id } = useParams();
    const [movie, setMovie] = useState({} as Movie);
    const navigate = useNavigate();

    const handleTicketPurchase = (movieId: number) => {
        navigate(`/booking/${movieId}`);
    }

    useEffect(() => {
        getMovieById(Number(id)).then((res)=>setMovie(res));
    }, [id]);

    return(

        <>
            {movie?(
                <section className="movie-page">
                    <div className="movie-image"> 
                        {movie.posterBase64? <img src={movie.posterBase64} alt={movie.title} /> : <img src={movie.posterUrl} alt={movie.title} className="move-image" /> }
                    </div>
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <p>{movie.description}</p>
                        <p>Categories: {movie.categories?.map((category)=>(<span>{category.name} </span>))}</p>
                        <p>Duration: {movie.duration} minutes</p>
                        <p>Age limit: {movie.ageLimit}</p>
                        <a href={movie.trailerUrl}>Watch trailer</a>
                        <button onClick={() => handleTicketPurchase(movie.id)} style={{marginTop:"10px"}}>Buy tickets</button>
                    </div>

                </section>
            ) : (
                <>
                    Sorry, we couldn't find the movie you were looking for.
                </>
            )}
        </>
    )
}