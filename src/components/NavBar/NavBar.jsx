import { Link, NavLink } from "react-router";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Favorites
        </NavLink>
      </nav>
    </>
  );
}

export default NavBar;
