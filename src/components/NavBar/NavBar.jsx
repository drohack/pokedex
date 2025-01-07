import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux"; // Import useSelector
import styles from "./NavBar.module.css";

function NavBar() {
  // Get the number of favorite Pokémon from the Redux store
  const favoritePokemon = useSelector((state) => state.favorites.favoritePokemon);
  
  // Get the length of the favoritePokemon array
  const favoriteCount = favoritePokemon.length;
  
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
          Favorites {favoriteCount > 0 ? `(${favoriteCount})` : ""}
        </NavLink>
      </nav>
    </>
  );
}

export default NavBar;
