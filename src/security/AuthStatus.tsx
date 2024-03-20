import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Logout from "./Logout";
import styles from "./AuthStatus.module.css"; // Assume you have this CSS module

export default function AuthStatus() {
  const auth = useAuth();
  console.log(auth);
  console.log("auth.isLoggedIn() = ", auth.isLoggedIn());
  if (!auth.isLoggedIn()) {
    console.log("if er true");

    return (
      <NavLink to="/login" className={styles.loginLink}>
        Login
      </NavLink>
    );
  } else {
    console.log("if er false");
    return (
      <div className={styles.authStatus}>
        <span className={styles.username}>{auth.username}</span>
        <div onClick={auth.signOut} className={styles.logoutLink}>
          Logout
        </div>
        {/* <Logout /> */}
      </div>
    );
  }
}
