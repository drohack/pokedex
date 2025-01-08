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
    // Get selected legendaries from Redux state
    const selectedLegendaries = useSelector((state) => state.legendaryFilter?.selectedLegendaries || []);
    // Get selected starters from Redux state
    const selectedStarters = useSelector((state) => state.starterFilter?.selectedStarters || []);

    // Filter Pokemon based on Search Filter and selected Types
    const visibleFavoritePokemon = favoritePokemon?.filter((p) => {
        // Check if any selected types match the Pokémon types
        const typesMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
            p.types.some((typeObj) => typeObj.type.name === selectedType)
        );

        // Check if the Pokémon's ID is in the selected legendaries list (or if none are selected)
        const legendaryMatches =
            selectedLegendaries.length === 0 ||
            selectedLegendaries.includes(p.id);

        // Check if the Pokémon's ID is in the selected starters list (or if none are selected)
        const starterMatches =
            selectedStarters.length === 0 ||
            selectedStarters.includes(p.id);

        return typesMatch && legendaryMatches && starterMatches;
    });

    return (
        <>
            <h1>Favorites</h1>
            {favoritePokemon.length === 0 ? emptyFavorites : <PokemonList pokemon={visibleFavoritePokemon} />}
        </>
    )
}

export default Favorites;