import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedPokemon } from "../../features/pokemon/pokemonSlice";
import { Link } from "react-router-dom";
import styles from "./PokemonList.module.css";
import Pokemon from "../../features/pokemon/Pokemon";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";

const PokemonList = ({ pokemon }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleClick = (selectedPokemon) => {
    dispatch(setSelectedPokemon(selectedPokemon));
  };

  const visiblePokemon =
    pokemon?.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (!pokemon) {
    return <p>Loading Pokemon...</p>;
  }

  return (
    <div className={styles.grid}>
      {visiblePokemon.map((p) => (
        <div key={p.id} className={styles.card}>
          <Pokemon pokemon={p} />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
