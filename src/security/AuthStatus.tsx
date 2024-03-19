import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthStatus() {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return (
        <NavLink to="/login">Login</NavLink>
    );
  } else {
    return (
        <Link to="/logout">Logout (Logged in as {auth.username})</Link>
    );
  }
}
