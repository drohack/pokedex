import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, getFavoritePokemon } from "../favorites/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./Pokemon.module.css";
import { capitalizeFirstLetter } from "../../utils";
import { setSelectedPokemon } from "./pokemonSlice";
import { Link } from "react-router-dom";
import db from "../../db/db";

const Pokemon = ({ pokemon }) => {
  const dispatch = useDispatch();
  const favoritePokemon = useSelector(getFavoritePokemon); // Get favorites from store
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavorited = favoritePokemon.some((fav) => fav.id === pokemon.id);
    setIsFavorite(isFavorited); // Check if favorited
  }, [favoritePokemon, pokemon.id]); // Track changes in favorites and id

  const handleToggleFavorite = () => {
    dispatch(
      toggleFavorite(pokemon)
    );
  };

  const handleClick = () => {
    dispatch(
      setSelectedPokemon({
        id: pokemon.id,
        imageUrl: pokemon.imageUrl,
        name: pokemon.name,
        types: pokemon.types,
        height: pokemon.height,
        weight: pokemon.weight,
      })
    );
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