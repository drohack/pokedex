import { useEffect } from "react";
import {
  getPokemonData,
  selectRegion,
  setRegion,
} from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import PokemonList from "../../components/PokemonList/PokemonList";
import styles from './home.module.css';

const entryRange = (limit, offset) => {
  return {
    limit: limit,
    offset: offset,
  };
};

const Regions = {
  KANTO: entryRange(150, 0),
  JOHTO: entryRange(100, 151),
  HOENN: entryRange(135, 251),
  SINNOH: entryRange(107, 386),
  UNOVA: entryRange(156, 493),
  KALOS: entryRange(72, 649),
  ALOLA: entryRange(88, 721),
  GALAR: entryRange(96, 809),
  PALDEA: entryRange(120, 905),
};

const Home = () => {
  const dispatch = useDispatch();
  const region = useSelector(selectRegion);

  useEffect(() => {
    if (region) {
      dispatch(getPokemonData(Regions[region]));
    }
  }, [dispatch, region]);

  const handleSelect = ({ target }) => {
    console.log(target.value);
    dispatch(setRegion(target.value));
  };

  return (
    <div className={styles.homeContainer}>
      {" "}
      {/* Added container div */}
      <h1>Pokedex</h1>
      <div className={styles.selectContainer}>
        {" "}
        {/* Added container for label and select */}
        <label htmlFor="region-select" className={styles.label}>
          {" "}
          {/* Added label styling */}
          Choose a region:
        </label>
        <select
          name="regions"
          id="region-select"
          value={region}
          onChange={handleSelect}
          className={styles.select} // Apply styles to the select
        >
          {Object.keys(Regions).map((regionName) => (
            <option key={regionName} value={regionName}>
              {regionName}
            </option>
          ))}
        </select>
      </div>
      <PokemonList />
    </div>
  );
};

export default Home;
