import { useDispatch, useSelector } from "react-redux";
import {
  selectPokemon,
  setSelectedPokemon,
} from "../../features/pokemon/pokemonSlice";
import { Link } from "react-router";

import styles from "./PokemonList.module.css";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);

  console.log("Pokemon data:", pokemon);

  const handleClick = (selectedPokemon) => {
    dispatch(setSelectedPokemon(selectedPokemon));
  };

  return (
    <div className={styles.grid}>
      {pokemon.map((p) => (
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
