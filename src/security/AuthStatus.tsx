import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthStatus() {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return (
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    );
  } else {
    return (
      <li>
        <Link to="/logout">Logout (Logged in as {auth.username})</Link>
      </li>
    );
  }
}
