import React, { useEffect } from "react";
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import styles from "./PokemonListUltimate.module.css";
import Pokemon from "../../features/pokemon/Pokemon";
import DraggablePokemon from "./DraggablePokemon";
import { getTypeBackground } from "../../pages/detail/PokemonDetails/PokemonDetails";
import { ItemTypes } from "../../pages/Ultimate151/DragableItemTypes";

const PokemonListUltimateDrop = ({ kantoPokemon, onDrop, onRemoveFavorite }) => {
  const ultimate151 = useSelector((state) => state.ultimate151.ultimate151);

  useEffect(() => {
    //console.log("Updated ultimate151 in Drop component:", ultimate151);
  }, [ultimate151]);

  return (
    <div className={styles.grid}>
      {kantoPokemon.map((p) => {
        const [, drop] = useDrop(() => ({
          accept: ItemTypes.POKEMON,
          drop: (item) => {
            //console.log("Dropping item:", item.pokemon.name, "onto:", p.name);
            onDrop(item.pokemon, p);
          },
        }));

        const ultimateEntry = ultimate151.find((entry) => entry.kanto.id === p.id);

        if (ultimateEntry) {
          return (
            <div key={p.id} ref={drop} className={`${styles.cardStack} ${ultimateEntry ? styles.dimmed : ''}`}>
              <div className={styles.card} style={getTypeBackground(p.types)}>
                <Pokemon pokemon={p} showType={!ultimateEntry} showHeart={false} small={ultimateEntry} />
              </div>
              <DraggablePokemon pokemon={ultimateEntry.favorite} onRemoveFavorite={onRemoveFavorite} showType={false} showHeart={false} small={true} />
            </div>
          );
        } else {
          return (
            <div key={p.id} ref={drop} className={styles.card} style={getTypeBackground(p.types)}>
              <Pokemon pokemon={p} showType={!ultimateEntry} showHeart={false} small={ultimateEntry} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default PokemonListUltimateDrop;
