import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, getFavoritePokemon } from "../favorites/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./Pokemon.module.css";
import { capitalizeFirstLetter } from "../../utils";
import { setSelectedPokemon } from "./pokemonSlice";
import { Link } from "react-router-dom";
import db from "../../db/db";
import type_styles from "../../pages/detail/PokemonDetails/PokemonDetails.module.css";

const Pokemon = ({ pokemon, showType = true, showHeart = true, small = false }) => {
  const dispatch = useDispatch();
  const favoritePokemon = useSelector(getFavoritePokemon); // Get favorites from store
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavorited = favoritePokemon.some((fav) => fav.id === pokemon.id);
    setIsFavorite(isFavorited); // Check if favorited
  }, [favoritePokemon, pokemon.id]); // Track changes in favorites and id

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
    <div className={`${styles.pokemon} ${small ? styles.small : ''}`}>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <h3 className={`${styles.name} ${small ? styles.smallName : ''}`}>{capitalizeFirstLetter(pokemon.name)}</h3>

      {/* Display Types */}
      <div className={type_styles.types}>
        {showType && pokemon.types && pokemon.types.length > 0
          ? pokemon.types.map((typeObj, index) => (
              <span key={index} className={type_styles.type}>
                {capitalizeFirstLetter(typeObj.type.name)}
              </span>
            ))
          : null}
      </div>
      
      {showHeart && 
        <div id="heart" className={styles.favDiv}>
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="white"/>}
        </div>
      }
    </div>
  );
};

export default Pokemon;