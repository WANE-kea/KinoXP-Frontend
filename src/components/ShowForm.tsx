import { useEffect, useState } from "react";
import { getAllMovies, getAllTheaters, handleShow } from "../services/apiFacade";

export default function ShowForm(){
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [endTime, setEndTime] = useState(new Date());
    const [manualEndTime, setManualEndTime] = useState(false);
    const [show, setShow] = useState({
        startTime: new Date(),
        endTime: new Date(),
        movie: {id:0},
        theater_id: 0,
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
                    startTime: Date.now(),
                    endTime: Date.now(),
                    movie: {id:0},
                    theater_id: 0,
                  });
                setEndTime(undefined);
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
        try {
          setShow((prev) => ({
            ...prev,
            [event.target.name]: event.target.name === "movie" ? {id: Number(event.target.value)} : Number(event.target.value),
          }));
          if(event.target.name === "movie" && event.target.value !== ""){
            if(!show.startTime || isNaN(new Date(show.startTime).getTime())) throw new Error("Invalid date");
              const movieDuration = movies.find((movie) => movie.id == event.target.value).duration;
              setEndTime(calcEndTime(show.startTime, movieDuration));
          }
        } catch (error) {
          return;
        }

      }

      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
              if(!event.target.value || isNaN(new Date(event.target.value).getTime())) throw new Error("Invalid date");
              const movieDuration = Number(movies.find((movie) => movie.id === show.movie.id).duration);
              const newEndTime = calcEndTime(new Date(event.target.value), movieDuration);
              setEndTime(newEndTime);
      
          setShow((prevShow) => ({
              ...prevShow,
              startTime: new Date(event.target.value),
              endTime: newEndTime,
          }));
        } catch (error) {
          console.log(error);
        }
    };

    const calcEndTime = (startTime, duration) => {
      const newEndTime = new Date(startTime);;
      return new Date(newEndTime.setMinutes(newEndTime.getMinutes() + duration));
    }


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
                    End time:
                    <input type="datetime-local" name="endTime" min={new Date(show.startTime).toISOString().slice(0,16)} value={new Date(endTime).toISOString().slice(0,16)} onChange={(event)=>setEndTime(new Date(event.target.value))} required disabled={!manualEndTime}/>
                </label>
                <label>
                    Set end time manually?
                    <input type="checkbox" name="manualEndTime" onChange={() => setManualEndTime(!manualEndTime)} checked={manualEndTime} />
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
            <p>{new Date(endTime).toISOString().slice(0,16)}</p>
        </>
    );
}