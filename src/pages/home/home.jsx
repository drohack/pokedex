import React from "react";

// Redux + React Query
import { useDispatch, useSelector } from "react-redux";
import { usePokemonData } from "../../hooks/usePokemonData";
import { selectRegion, setRegion } from "../../features/regions/regionsSlice";
import { setSelectedPokemon } from "../../features/pokemon/pokemonSlice";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";

// Components
import PokemonList from "../../components/PokemonList/PokemonList";
import SearchTerm from "../../components/SearchTerm/SearchTerm";

// Styles
import styles from "./Home.module.css";

// Other
import { Regions } from "../../utils";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectRegion);
  const searchTerm = useSelector(selectSearchTerm);

  const { isLoading, error, data: pokemon } = usePokemonData();
  console.log(`Pokemon data: ${pokemon?.length}`)

  const handleSelect = ({ target }) => {
    dispatch(setRegion(target.value));
  };

  const visiblePokemon =
    pokemon?.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.selectContainer}>
        <label htmlFor="region-select" className={styles.label}>
          Choose a region:
        </label>
        <select
          name="regions"
          id="region-select"
          value={selectedRegion}
          onChange={handleSelect}
          className={styles.select}
        >
          {Object.keys(Regions).map((regionName) => (
            <option key={regionName} value={regionName}>
              {regionName}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <p>Loading...</p>}

      {error && <p>An error has occurred: {error.message}</p>}

      {pokemon && (
        <>
          <SearchTerm searchTerm={searchTerm} />
          <PokemonList
            pokemon={visiblePokemon}
          />
        </>
      )}
    </div>
  );
};

export default Home;
