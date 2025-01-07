import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux"; // Import useSelector
import styles from "./NavBar.module.css";

import ChooseARegion from "../ChooseARegion/ChooseARegion";
import SearchTerm from "../../components/SearchTerm/SearchTerm";
// Redux + React Query
import { usePokemonData } from "../../hooks/usePokemonData";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";

function NavBar() {
  // Get the number of favorite Pokémon from the Redux store
  const favoritePokemon = useSelector((state) => state.favorites.favoritePokemon);

  // Get the length of the favoritePokemon array
  const favoriteCount = favoritePokemon.length;

  // SearchTerm
  const searchTerm = useSelector(selectSearchTerm);
  const { isLoading, error, data: pokemon } = usePokemonData();
  console.log(`Pokemon data: ${pokemon?.length}`)
  const visiblePokemon =
    pokemon?.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <nav className={styles.nav}>
        <div>
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
        </div>
        <div>
          <ChooseARegion />
          <SearchTerm searchTerm={searchTerm} />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
