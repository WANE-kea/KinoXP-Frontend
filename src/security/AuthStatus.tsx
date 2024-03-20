import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "./AuthStatus.module.css"; // Assume you have this CSS module

export default function AuthStatus() {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return (
      <div className={styles.authLinks}>
        <NavLink to="/login" className={styles.loginLink}>
          Login
        </NavLink>
        <NavLink to="/signup" className={styles.signupLink}>
          Sign Up
        </NavLink>
      </div>
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