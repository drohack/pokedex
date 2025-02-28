import React, { useEffect } from "react";
import { useDrag } from 'react-dnd';
import styles from "./PokemonListUltimate.module.css";
import Pokemon from "../../features/pokemon/Pokemon";
import { getTypeBackground } from "../../pages/detail/PokemonDetails/PokemonDetails";
import { ItemTypes } from "../../pages/Ultimate151/DragableItemTypes";

const DraggablePokemon = ({ pokemon, onRemoveFavorite, showType = true, showHeart = true, small = false }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.POKEMON,
    item: () => ({ pokemon }), // <--- Use a function to ensure fresh data
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.removeFavorite) {
        onRemoveFavorite(pokemon);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [pokemon]); // <--- Ensure reactivity when `pokemon` updates

  useEffect(() => {
    //console.log("Updated DraggablePokemon:", pokemon.name);
  }, [pokemon]);

  return (
    <div ref={drag} className={styles.card} style={{...getTypeBackground(pokemon.types), opacity: isDragging ? 0.5 : 1 }}>
      <Pokemon pokemon={pokemon} showType={showType} showHeart={showHeart} small={small} />
    </div>
  );
};

export default DraggablePokemon;