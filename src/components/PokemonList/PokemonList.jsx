import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPokemon } from "../../features/pokemon/pokemonSlice";
import { toggleFavorite, getLockedPokemon, getFavoritePokemon, toggleLock } from "../../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";
import styles from "./PokemonList.module.css";
import Pokemon from "../../features/pokemon/Pokemon";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";
import { getTypeBackground } from "../../pages/detail/PokemonDetails/PokemonDetails";
import { FaLock, FaUnlock } from "react-icons/fa";


const PokemonList = ({ pokemon }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const favoritePokemon = useSelector(getFavoritePokemon);
  const lockedPokemon = useSelector(getLockedPokemon);

  const handleClick = (selectedPokemon) => {
    dispatch(setSelectedPokemon(selectedPokemon));
  };

  const handleToggleFavorite = (pokemon) => {
    if (!lockedPokemon[pokemon.id]) {
      dispatch(
        toggleFavorite(pokemon)
      );
    }
  };

  const handleToggleLock = (p, e) => {
    e.stopPropagation();
    dispatch(toggleLock(p));
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
      {visiblePokemon.map((p) => {
        const isFavorite = favoritePokemon.some((fav) => fav.id === p.id);
        return (
          <div key={p.id} className={styles.cardContainer}>
            <button className={styles.card} style={getTypeBackground(p.types)} onClick={() => handleToggleFavorite(p)}>
              <Pokemon pokemon={p} />
              {isFavorite && (
                <div className={styles.lockButton} onClick={(e) => {handleToggleLock(p, e);}}>
                  {lockedPokemon[p.id] ? <FaLock color="gold" /> : <FaUnlock color="white" />}
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
