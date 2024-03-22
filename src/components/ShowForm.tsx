import { ChangeEvent, useEffect, useState } from "react";
import { getAllMovies, getAllTheaters, handleShow } from "../services/apiFacade";
import { Movie, Show, Theater } from "../models/interfaces";

export default function ShowForm(){
  const emptyShow: Show = {
    startTime: new Date(),
    movie: {
      title: "",
      description: "",
      posterBase64: "",
      trailerUrl: "",
      posterUrl: "",
      ageLimit: 0,
      duration: 0,
      categories: []
    },
    theater_id: 0,
    bookings: [],
  }

    const [movies, setMovies] = useState<Movie[]>([]);
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [show, setShow] = useState<Show>(emptyShow);
    

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  useEffect(() => {
    getAllTheaters().then((data) => {
      setTheaters(data);
    });
  }, []);

      const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
            const res =  await handleShow(show);
            if(res) {
                setShow(emptyShow);
                };
                showFeedBack("Show created", true);
        } catch (error) {
            console.log(error);
            
        }

    }


  const showFeedBack = (message:string, success:boolean) => {
    const div = document.createElement("div");
    div.textContent = message;
    div.style.position = "fixed";
    div.style.alignSelf = "center";
    div.style.transform = "translate(600%, 0%)";
    div.style.padding = "20px";
    div.style.borderRadius = "5px";
    div.style.color = "white";
    div.style.backgroundColor = success ? "green" : "red";
    document.body.appendChild(div);
    setTimeout(() => {
      document.body.removeChild(div);
    }, 5000);
  };

      const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          setShow((prev) => ({
            ...prev,
            [event.target.name]: event.target.name === "movie" ? {id: Number(event.target.value)} : Number(event.target.value),
          }));
      }

      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
          if(!event.target.value || isNaN(new Date(event.target.value).getTime())) throw new Error("Invalid date");
          const startTime = new Date(event.target.value);
      
          setShow((prevShow) => ({
              ...prevShow,
              startTime: startTime,
          }));
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <>
            <h1>Show form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie:
                    <select name="movie" onChange={handleChange} required>
                    <option value={""}>Select Movie</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}</select>
                </label>

                <label>
                    Start time:
                    <input type="datetime-local" min={new Date().toISOString().slice(0,16)} name="startTime" onChange={handleTimeChange} required/>
                </label>
                <label>
                    Theater:
                    <select name="theater_id" onChange={handleChange} required>
                        <option value={""}>Select Theater</option>
                        {theaters.map((theater) => (
                            <option key={theater.id} value={theater.id}>
                                {theater.name}
                            </option>
                        ))}</select>
                </label>

                <button type="submit">Create show</button>
            </form>
            
        </>
    );
}
