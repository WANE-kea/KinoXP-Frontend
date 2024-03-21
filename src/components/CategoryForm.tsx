import { ChangeEvent, useEffect, useState } from "react";
import { getAllCategories, handleCategory } from "../services/apiFacade";

export default function CategoryForm() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({
        name: "",
    });

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategory((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await handleCategory(category);
            if (res.ok) {
                event.target.reset();
                getAllCategories().then((data) => {
                    setCategories(data);
                });
                setCategory({
                    name: "",
                });
                showFeedBack("Category created", true);
            }
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
    };

    return (
        <>
            <h1>Category Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={category.name}
                    />
                </label>
                <button type="submit">Create Category</button>
            </form>
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </>
    );
}