import { NavLink } from "react-router-dom";
import AuthStatus from "../security/AuthStatus";
import { useAuth } from "../security/AuthProvider";

export default function Navbar() {
  const auth = useAuth();
  return (
    <nav>
          <NavLink to="/">Program</NavLink>
          <NavLink to="/movies">Upcoming movies</NavLink>
          <NavLink to="/genres">Genres</NavLink>
          <NavLink to="/about">About us</NavLink>
          {auth.isLoggedInAs(["ADMIN"]) && (
            <NavLink to="/admin">Admin</NavLink>
          )} 
        <AuthStatus />
    </nav>
  
  );
}
