import { useSelector } from "react-redux";
import { selectPokemon } from "../../features/pokemon/pokemonSlice";

import styles from './PokemonList.module.css'

const PokemonList = () => {
  const pokemon = useSelector(selectPokemon);

  console.log("Pokemon data:", pokemon);

  return (
    <div className={styles.grid}>
      {pokemon.map((p) => (
        <div key={p.id} className={styles.card}>
          <img src={p.imageUrl} alt={p.name}></img>
          <h3>{p.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
