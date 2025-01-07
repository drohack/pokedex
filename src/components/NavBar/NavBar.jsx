import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";

import ChooseARegion from "../ChooseARegion/ChooseARegion";
import SearchTerm from "../SearchTerm/SearchTerm";
import { selectSearchTerm } from "../SearchTerm/searchTermSlice";
import TypeFilter from "../TypeFilter/TypeFilter"

function NavBar() {
  const favoritePokemon = useSelector((state) => state.favorites.favoritePokemon);
  const favoriteCount = favoritePokemon.length;
  const searchTerm = useSelector(selectSearchTerm);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

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

        {/* Expandable Row */}
        <div className={styles.expandable}>
          <div className={`${styles.expandedContent} ${isExpanded ? styles.expanded : ""}`}>
            {/* Add content for the expandable row here */}
            <TypeFilter />
          </div>
          <button onClick={toggleExpand} className={styles.expandButton}>
            {isExpanded ? "Hide Advanced Search ▲" : "Show Advanced Search ▼"}
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
