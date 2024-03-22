import { ChangeEvent, useEffect, useState } from "react";
import { getAllCategories, handleMovie } from "../services/apiFacade";
import { Category, Movie } from "../models/interfaces";

export default function MovieForm() {
  const emptyMovie: Movie = {
    title: "",
    description: "",
    duration: 0,
    categories: [""],
    posterUrl: "",
    posterBase64: "",
    trailerUrl: "",
    ageLimit: 0,
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [movie, setMovie] = useState<Movie>(emptyMovie);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedCategories.includes({name:event.target.value})) {
      setSelectedCategories((prev) => prev.filter((c) => c.name !== event.target.value));
      setMovie((prevMovie) => ({ ...prevMovie, categories: selectedCategories.map((category)=>{return category.name}) }));
    } else {
      setSelectedCategories((prev) => [...prev, {name: event.target.value}]);
      setMovie((prevMovie) => ({ ...prevMovie, categories: selectedCategories.map((category)=>{return category.name}) }));
      };
  }

  const handleBase64 = (event:ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (!event.currentTarget.files) return;
    reader.readAsDataURL(event.currentTarget.files[0]);
    reader.onload = () => {
      setMovie((prev) => ({ ...prev, posterBase64: reader.result as string }));
    };
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMovie((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const res = await handleMovie(movie);
      if (res) {
        event.target.reset();
        setMovie(emptyMovie);
        showFeedBack("Movie created", true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      <h1>Movie form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleChange} value={movie.title} />
        </label>
        <label>
          Description:
          <input type="text" name="description" onChange={handleChange} value={movie.description} />
        </label>
        <label>
          Runtime (minutes):
          <input type="number" name="duration" onChange={handleChange} value={movie.duration} />
        </label>
        <label>
          Age Limit:
          <input type="number" name="ageLimit" onChange={handleChange} value={movie.ageLimit} />
        </label>
        {categories.length > 0 &&
          categories.map((category) => (
            <label key={category.id}>
              {category.name}
              <input type="checkbox" name="categories" value={category.name} onChange={handleCategory} />
            </label>
          ))}
        <label>
          Trailer:
          <input type="text" name="trailerUrl" onChange={handleChange} value={movie.trailerUrl} />
        </label>
        <label>
          Poster URL:
          <input type="text" name="posterUrl" onChange={handleChange} value={movie.posterUrl} />
        </label>
        <label>
          Upload poster:
          <input type="file" name="posterBase64" accept="image/*" onChange={handleBase64} />
          {movie.posterBase64 && <img src={movie.posterBase64} alt="Poster Preview" className="img-preview" />}
        </label>
        <button type="submit">Create movie</button>
      </form>
    </>
  );
}
