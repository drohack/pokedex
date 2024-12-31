import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedPokemon } from "../../features/pokemon/pokemonSliceV1";
import { Link } from "react-router-dom";
import styles from "./PokemonList.module.css";
import { capitalizeFirstLetter } from "../../utils"; // Import your capitalization function

const PokemonList = ({ pokemon }) => {
    const dispatch = useDispatch();

    const handleClick = (selectedPokemon) => {
        dispatch(setSelectedPokemon(selectedPokemon));
    };

    if (!pokemon || pokemon.length === 0) {
        return <p>Loading Pokemon...</p>; // Display loading message if no pokemon
    }

    return (
        <div className={styles.grid}>
            {pokemon.map((p) => (
                <div key={p.id} className={styles.card}>
                    <Link
                        to={`/pokemon/${p.name}`}
                        onClick={() => handleClick(p)}
                    >
                        <img src={p.imageUrl} alt={p.name} />
                        <h3>{capitalizeFirstLetter(p.name)}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;