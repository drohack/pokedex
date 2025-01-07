import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedPokemon } from "../../features/pokemon/pokemonSlice";
import { Link } from "react-router-dom";
import styles from "./PokemonList.module.css";
import Pokemon from "../../features/pokemon/Pokemon";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";
import { getTypeBackground } from "../../pages/detail/PokemonDetails/PokemonDetails";


const PokemonList = ({ pokemon }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleClick = (selectedPokemon) => {
    dispatch(setSelectedPokemon(selectedPokemon));
  };

  const visiblePokemon =
    pokemon?.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => a.id - b.id) || [];

  if (!pokemon) {
    return <p>Loading Pokemon...</p>;
  }

  return (
    <div className={styles.grid}>
      {visiblePokemon.map((p) => (
        <div key={p.id} className={styles.card} style={getTypeBackground(p.types)}>
          <Pokemon pokemon={p} />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
