import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getMovieById } from "../services/apiFacade";
import { Movie } from "../services/interfaces";

export default function MoviePage(){
    const { id } = useParams();
    const [movie, setMovie] = useState({} as Movie);

    useEffect(() => {
        getMovieById(id).then((res)=>setMovie(res));
    }), [id];

    return(
        <>
            {movie?(
                <section className="movie-page">
                    {movie.posterBase64? <img src={movie.posterBase64} alt={movie.title} style={{width:"25%"}} /> : <img src={movie.posterUrl} alt={movie.title} className="move-image" style={{width:"25%"}}/> }
                    <h1>{movie.title}</h1>
                    <p>{movie.description}</p>
                    <p>Categories: {movie.categories?.map((category)=>(<span>{category.name} </span>))}</p>
                    <p>Duration: {movie.duration} minutes</p>
                    <p>Age limit: {movie.ageLimit}</p>
                    <a href={movie.trailerUrl}>Watch trailer</a>
                </section>
            ) : (
                <>
                    Sorry, we couldn't find the movie you were looking for.
                </>
            )}
        </>
    )
}