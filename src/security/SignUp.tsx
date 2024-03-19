import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { User } from "../services/authFacade";

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
    street_address: "",
    street_no: "",
    zip: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [err, setErr] = useState(null);

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData) as unknown as User;

    setErr(null);
    console.log(err);
    alert("Sign up: " + JSON.stringify(user));

    auth
      .signUp(user)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setErr(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="email" name="username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      </label>
      <label>
        Email:
        <input type="email" name="email" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      </label>
      <label>
        Country:
        <input type="text" name="country" onChange={(e) => setUser({ ...user, country: e.target.value })} />
      </label>
      <label>
        First Name:
        <input type="text" name="first_name" onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
      </label>
      <label>
        Last Name:
        <input type="text" name="last_name" onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
      </label>
      <label>
        Middle Name:
        <input type="text" name="middle_name" onChange={(e) => setUser({ ...user, middle_name: e.target.value })} />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" onChange={(e) => setUser({ ...user, phone: e.target.value })} />
      </label>
      <label>
        Street Address:
        <input
          type="text"
          name="street_address"
          onChange={(e) => setUser({ ...user, street_address: e.target.value })}
        />
      </label>
      <label>
        Street No:
        <input type="text" name="street_no" onChange={(e) => setUser({ ...user, street_no: e.target.value })} />
      </label>
      <label>
        ZIP:
        <input type="text" name="zip" onChange={(e) => setUser({ ...user, zip: e.target.value })} />
      </label>
      <input type="submit" value="Sign Up" />
    </form>
  );
}
