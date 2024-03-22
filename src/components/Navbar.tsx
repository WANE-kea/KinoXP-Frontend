import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthStatus from "../security/AuthStatus";
import { useAuth } from "../security/AuthProvider";
import styles from "./Navbar.module.css"; // Import the CSS module

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get the class name for a nav link
  const getNavLinkClass = (isActive) => {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.burgerMenu} onClick={handleToggle}>
        ☰
      </div>
      <div className={`${styles.navItems} ${isMenuOpen ? styles.active : ""}`}>
        <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
          Program
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => getNavLinkClass(isActive)}>
          Upcoming movies
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => getNavLinkClass(isActive)}>
          About us
        </NavLink>
        {auth.isLoggedInAs(["ADMIN"]) && (
          <NavLink to="/admin" className={({ isActive }) => getNavLinkClass(isActive)}>
            Admin
          </NavLink>
        )}
      </div>
      <AuthStatus />
    </nav>
  );
}
