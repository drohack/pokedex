import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Favorites.module.css';
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";
import { capitalizeFirstLetter } from "../../utils/index";

export const ExportFavorites = () => {
    const favoritePokemon = useSelector(getFavoritePokemon);

    const handleExportList = () => {
        // Create a string with each favorite Pokémon on a new line
        const favoriteList = favoritePokemon.map(pokemon => `${capitalizeFirstLetter(pokemon.name)}`).join('\n');

        // Create a Blob from the string
        const blob = new Blob([favoriteList], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'favorite_pokemon.txt';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.filterContainer}>
            <button onClick={handleExportList} className={styles.clearButton}>Export List</button>
        </div>
    );
};

export default ExportFavorites;
