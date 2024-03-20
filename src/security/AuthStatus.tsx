import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "./AuthStatus.module.css"; // Assume you have this CSS module

export default function AuthStatus() {
  const auth = useAuth();
  if (!auth.isLoggedIn()) {
    return (
      <>
      <NavLink to="/login" className={styles.loginLink}>
        Login
      </NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  } else {
    return (
      <div className={styles.authStatus}>
        <span className={styles.username}>{auth.username}</span>
        <div onClick={auth.signOut} className={styles.logoutLink}>
          Logout
        </div>
      </div>
    );
  }
}
