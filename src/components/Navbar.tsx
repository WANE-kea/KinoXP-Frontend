import { NavLink } from "react-router-dom";
import AuthStatus from "../security/AuthStatus";
import { useAuth } from "../security/AuthProvider";

export default function Navbar() {
  const auth = useAuth();
  return (
    <nav>
          <button>
          <NavLink to="/">Program</NavLink>
          </button>
          <button>
          <NavLink to="/movies">Upcoming movies</NavLink>
          </button>
          <button>
          <NavLink to="/genres">Genres</NavLink>
          </button>
          <button>
          <NavLink to="/about">About us</NavLink>
          </button>
          {auth.isLoggedInAs(["ADMIN"]) && (
            <button>
              <NavLink to="/admin">Admin</NavLink>
            </button>
          )} 
        <AuthStatus />
    </nav>
  
  );
}
