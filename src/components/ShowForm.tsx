import { useEffect, useState } from "react";
import { getAllMovies, getAllTheaters, handleShow } from "../services/apiFacade";
import { Show } from "../models/interfaces";

export default function ShowForm() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [endTime, setEndTime] = useState(undefined);
  const [show, setShow] = useState<Show>({
    id: null,
    startTime: new Date(),
    endTime: endTime,
    movie: { id: 0, title: "", description: "", posterBase64: null, trailerUrl: null, posterUrl: null, ageLimit: 0, duration: 0, categories: [] },
    theater_id: 0,
    bookings: [],
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
      const res = await handleShow(show);
      if (res) {
        event.target.reset();
        setShow({
          id: null,
          startTime: new Date(),
          endTime: endTime,
          movie: {
            id: 0,
            title: "",
            description: "",
            posterBase64: null,
            trailerUrl: null,
            posterUrl: null,
            ageLimit: 0,
            duration: 0,
            categories: [],
          },
          theater_id: 0,
          bookings: [],
        });
        setEndTime(undefined);
      }
      showFeedBack("Show created", true);
    } catch (error) {
      console.log(error);
    }
  };

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
  };

  const handleChange = (event) => {
    setShow((prev) => ({
      ...prev,
      [event.target.name]: event.target.name === "movie" ? { id: Number(event.target.value) } : Number(event.target.value),
    }));
  };

  const handleTimeChange = (event) => {
    setShow((prev) => ({
      ...prev,
      startTime: event.target.value,
    }));
    setEndTime(calcEndTime());
  };

  const calcEndTime = () => {
    const startTime = new Date(show.startTime).getTime();
    const endTime = show.movie.id === 0 ? Date.now() : startTime + movies.find((movie) => movie.id === show.movie.id).duration * 60000;
    return new Date(endTime);
  };

  return (
    <>
      <h1>Show form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie:
          <select name="movie" onChange={handleChange} required>
            <option>Select Movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Start time:
          <input type="datetime-local" name="startTime" onChange={handleTimeChange} required />
        </label>
        <label>
          End time:
          <input type="text" name="endTime" value={endTime} disabled required />
        </label>
        <label>
          Theater:
          <select name="theater_id" onChange={handleChange} required>
            <option>Select Theater</option>
            {theaters.map((theater) => (
              <option key={theater.id} value={theater.id}>
                {theater.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Create show</button>
      </form>
    </>
  );
}
