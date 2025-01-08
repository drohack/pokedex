import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NavBar.module.css";

import ChooseARegion from "../ChooseARegion/ChooseARegion";
import SearchTerm from "../SearchTerm/SearchTerm";
import { selectSearchTerm, setSearchTerm } from "../SearchTerm/searchTermSlice";
import TypeFilter from "../TypeFilter/TypeFilter";
import { setSelectedTypes } from "../TypeFilter/typeFilterSlice";
import LegendaryFilter from "../LegendaryFilter/LegendaryFilter";
import { setSelectedLegendaries } from "../LegendaryFilter/legendaryFilterSlice";
import StarterFilter from "../StarterFilter/StarterFilter";
import { setSelectedStarters } from "../StarterFilter/starterFilterSlice";

function NavBar() {
  const dispatch = useDispatch();
  const favoritePokemon = useSelector((state) => state.favorites.favoritePokemon);
  const favoriteCount = favoritePokemon.length;
  const searchTerm = useSelector(selectSearchTerm);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const clearFilters = () => {
    dispatch(setSearchTerm("")); // Clear search term
    dispatch(setSelectedTypes([])); // Clear selected types
    dispatch(setSelectedLegendaries([])); // Clear selected legendaries
    dispatch(setSelectedStarters([])); // Clear selected starters
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navDiv}>
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
        <div className={styles.navDiv}>
          <ChooseARegion />
          <SearchTerm searchTerm={searchTerm} />
          <button onClick={clearFilters} className={styles.clearButton}>
            Clear Filters
          </button>
        </div>

        {/* Expandable Row */}
        <div className={styles.expandable}>
          <div className={`${styles.expandedContent} ${isExpanded ? styles.expanded : ""}`}>
            {/* Add content for the expandable row here */}
            <div  className={styles.navDiv}>
              <TypeFilter />
              <LegendaryFilter />
              <StarterFilter />
            </div>
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
