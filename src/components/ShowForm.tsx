import { ChangeEvent, useEffect, useState } from "react";
import { getAllMovies, getAllTheaters, handleShow } from "../services/apiFacade";

export default function ShowForm(){
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [endTime, setEndTime] = useState("");
    const [show, setShow] = useState({
        startTime: "",
        endTime: "",
        movie: {id:""},
        theater: {id:""},
      });
    

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

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res =  await handleShow(show);
            if(res) {
                event.target.reset();
                setShow({
                    startTime: "",
                    endTime: "",
                    movie: {id:""},
                    theater: {id:""},
                  });
                };
                showFeedBack("Show created", true);
        } catch (error) {
            console.log(error);
            
        }

    }

    const showFeedBack = (message, success) => {
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
      }

      const handleChange = (event) => {
        setShow((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }


        const handleTimeChange = (event) => {
            setShow((prev) => ({
            ...prev,
            startTime: event.target.value,
            endTime: calcEndTime(),
            }));
            setEndTime(calcEndTime());
        }

      const calcEndTime = ()=>{
        console.log(movies);
        console.log(show.startTime);
        const startTime = new Date(show.startTime).getTime();
        console.log(startTime);
        const endTime = startTime + (movies.find((movie) => movie.id === show.movie.id).duration*60000);
        console.log(endTime);
        return new Date(endTime).toISOString();
      };


    return (
        <>
            <h1>Show form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie:
                    <select name="movie" onChange={handleChange}>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}</select>
                </label>

                <label>
                    Start time:
                    <input type="datetime-local" name="startTime" onChange={handleTimeChange} />
                </label>
                <label>
                    End time:
                    <input type="datetime-local" name="endTime" value={endTime} required/>
                </label>
                <label>
                    Theater:
                    <select name="theater" onChange={handleChange}>
                        {theaters.map((theater) => (
                            <option key={theater.id} value={theater.id}>
                                {theater.name}
                            </option>
                        ))}</select>
                </label>

                <button type="submit">Create show</button>
            </form>
           {show.startTime && <p>End time: {calcEndTime()}</p>}
        </>
    );
}