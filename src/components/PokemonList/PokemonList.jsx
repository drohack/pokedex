import { useDispatch, useSelector } from "react-redux";
import {
  selectPokemon,
  setSelectedPokemon
} from "../../features/pokemon/pokemonSlice";
import { Link } from "react-router";

import styles from "./PokemonList.module.css";
import { selectSearchTerm } from "../../features/searchTerm/searchTermSlice";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const searchTerm = useSelector(selectSearchTerm);

  console.log("Pokemon data:", pokemon);

  const handleClick = (selectedPokemon) => {
    dispatch(setSelectedPokemon(selectedPokemon));
  };

  const visiblePokemon = getFilteredPokemon(pokemon, searchTerm);

  if (visiblePokemon.length === 0) {
    return <p> Sorry, no pokemon were found... </p>;
  }

  return (
    <div className={styles.grid}>
      {visiblePokemon.map((p) => (
        <div key={p.id} className={styles.card}>
          <Link
            to={`/pokemon/${p.name}`}
            onClick={() => {
              handleClick(p);
            }}
          >
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

function getFilteredPokemon(pokemon, searchTerm) {
  return pokemon.filter(mon => mon.name.toLowerCase().includes(searchTerm.toLowerCase()))
}
