import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthStatus() {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return (
      <>
        <button>
          {" "}
          <NavLink to="/login">Login</NavLink>
        </button>
        <button>
          <NavLink to="/signup">Sign Up</NavLink>
        </button>
      </>
    );
  } else {
    return <Link to="/logout">Logout (Logged in as {auth.username})</Link>;
  }
}
