import { NavLink } from "react-router-dom";
import AuthStatus from "../security/AuthStatus";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Program</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Upcoming movies</NavLink>
        </li>
        <li>
          <NavLink to="/genres">Genres</NavLink>
        </li>
        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
        <AuthStatus />
      </ul>
    </nav>
  );
}
