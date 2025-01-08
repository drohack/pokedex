import styles from "./Favorites.module.css";
import PokemonList from "../../components/PokemonList/PokemonList";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../db/db";
import { useSelector } from "react-redux";
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";

function Favorites() {
    const favoritePokemon = useSelector(getFavoritePokemon);

    const emptyFavorites = <p>No favorite Pokemon</p>

    // Get selected types from Redux state
    const selectedTypes = useSelector((state) => state.typeFilter?.selectedTypes || []);
    
    // Filter Pokemon based on Search Filter and selected Types
    const visibleFavoritePokemon = favoritePokemon?.filter((p) => {        
        // Check if any selected types match the Pokémon types
        const typesMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
            p.types.some((typeObj) => typeObj.type.name === selectedType)
        );

        return typesMatch;
    });

    return (
        <>
            <h1>Favorites</h1>
            {favoritePokemon.length === 0 ? emptyFavorites : <PokemonList pokemon={ visibleFavoritePokemon } />}
        </>
    )
}

export default Favorites;