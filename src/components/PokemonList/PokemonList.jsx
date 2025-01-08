import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedPokemon } from "../../features/pokemon/pokemonSlice";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
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

  const handleToggleFavorite = (pokemon) => {
    dispatch(
      toggleFavorite(pokemon)
    );
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
        <button key={p.id} className={styles.card} style={getTypeBackground(p.types)} onClick={() => handleToggleFavorite(p)}>
          <Pokemon pokemon={p} />
        </button>
      ))}
    </div>
  );
};

export default PokemonList;
