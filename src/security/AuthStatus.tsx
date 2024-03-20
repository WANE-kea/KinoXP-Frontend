import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Logout from "./Logout";
import styles from "./AuthStatus.module.css"; // Assume you have this CSS module

export default function AuthStatus() {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return (
      <NavLink to="/login" className={styles.loginLink}>
        Login
      </NavLink>
    );
  } else {
    return (
      <div className={styles.authStatus}>
        <span className={styles.username}>{auth.username}</span>
        <Link to="/logout" className={styles.logoutLink}>
          Logout
        </Link>
      </div>
    );
  }
}
