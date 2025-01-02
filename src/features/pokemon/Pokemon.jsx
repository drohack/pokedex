import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  getFavoritePokemon,
} from "../favorites/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./Pokemon.module.css";
import { capitalizeFirstLetter } from "../../utils";
import { setSelectedPokemon } from "./pokemonSlice";
import { Link } from "react-router-dom";


const Pokemon = ({ pokemon }) => {
  const dispatch = useDispatch();
  const favoritePokemon = useSelector(getFavoritePokemon);

  const isFavorite = favoritePokemon.some((fav) => fav.id === pokemon.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(pokemon));
  };

  const handleClick = () => {
    dispatch(setSelectedPokemon(pokemon));
  };

  return (
    <>
      <Link to={`/pokemon/${pokemon.name}`} onClick={handleClick}>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
      </Link>
      <button onClick={handleToggleFavorite} className={styles.favButton}>
        {isFavorite ? <FaHeart fill="red" /> : <FaRegHeart />}
      </button>
    </>
  );
};

export default Pokemon;
