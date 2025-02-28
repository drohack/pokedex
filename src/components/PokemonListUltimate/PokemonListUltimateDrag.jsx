import React from "react";
import { useDrop } from 'react-dnd';
import styles from "./PokemonListUltimate.module.css";
import DraggablePokemon from "./DraggablePokemon";
import { ItemTypes } from "../../pages/Ultimate151/DragableItemTypes";

const PokemonListUltimateDrag = ({ pokemon, onRemoveFavorite }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.POKEMON,
    drop: () => ({ removeFavorite: true }),
  }));

  return (
    <div ref={drop} className={styles.faveoriteDropArea}>
      <div className={styles.grid}>
        {pokemon.map((p) => (
          <DraggablePokemon key={p.id} pokemon={p} onRemoveFavorite={onRemoveFavorite} showHeart={false}/>
        ))}
      </div>
    </div>
  );
};

export default PokemonListUltimateDrag;
