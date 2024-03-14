import { Link, NavLink } from "react-router-dom";
import AuthStatus from "../security/AuthStatus";
import { useAuth } from "../security/AuthProvider";

export default function Navbar() {
  const auth = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Program</NavLink>
        </li>
        <li>
          <NavLink to="/film">Kommende Film</NavLink>
        </li>
      </ul>
    </nav>
  );
}
