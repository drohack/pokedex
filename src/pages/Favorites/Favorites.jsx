import { useDispatch, useSelector } from 'react-redux';
import styles from "./Favorites.module.css";
import PokemonList from "../../components/PokemonList/PokemonList";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../db/db";
import { getFavoritePokemon, clearAllFavorites } from "../../features/favorites/favoritesSlice";
import { StartersAndEvolutions, PseudoLegendaries, SubLegendaries, Legendaries, Mythical } from "../../utils/index";

function Favorites() {
    const dispatch = useDispatch();
    const favoritePokemon = useSelector(getFavoritePokemon);

    const emptyFavorites = <p>No favorite Pokemon</p>

    // Get selected types from Redux state
    const selectedTypes = useSelector((state) => state.typeFilter?.selectedTypes || []);
    // Get selected legendaries from Redux state
    const selectedPseudoLegendaries = useSelector((state) => state.pseudoLegendaryFilter?.selectedPseudoLegendaries || []);
    // Get selected legendaries from Redux state
    const selectedLegendaries = useSelector((state) => state.legendaryFilter?.selectedLegendaries || []);
    // Get selected starters from Redux state
    const selectedStarters = useSelector((state) => state.starterFilter?.selectedStarters || []);
    // Get selected exclusions from Redux state
    const selectedExclusions = useSelector((state) => state.exclusionFilter?.selectedExclusions || []);

    // Convert StartersAndEvolutions object to an array of IDs
    const starterIds = Object.values(StartersAndEvolutions).map(starter => starter.id);

    // Convert PseudoLegendaries, SubLegendaries, Legendaries, and Mythical objects to arrays of IDs
    const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
    const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
    const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);

    // Combine all legendary-related IDs into a single array
    const allLegendaryIds = [...subLegendaryIds, ...legendaryIds, ...mythicalIds];

    // Check if any selected legendaries are in the SubLegendaries list
    const combinedLegendariesPseudoStarterIds = [ ...selectedLegendaries, ...selectedPseudoLegendaries, ...selectedStarters ];


    const handleClearFavorites = () => {
        if (window.confirm('Do you want to clear all favorites?')) {
            dispatch(clearAllFavorites());
        }
    };


    // Filter Pokemon based on Search Filter and selected Types
    const visibleFavoritePokemon = favoritePokemon?.filter((p) => {
        // Check if any selected types match the Pokémon types
        const typesMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
            p.types.some((typeObj) => typeObj.type.name === selectedType)
        );

        // Check if the Pokémon's ID is in the selected legendaries list (or if none are selected)
        const combinedLegendaryPseudoStarterMatches = 
            combinedLegendariesPseudoStarterIds.length === 0 || 
            combinedLegendariesPseudoStarterIds.includes(p.id);

        // Check if the Pokémon's ID is in the StartersAndEvolutions list if "Starters" is in selectedExclusions
        const isStarterExcluded =
            selectedExclusions.includes("Starters") &&
            starterIds.includes(p.id);

        // Check if the Pokémon's ID is in the allLegendaryIds list if "Legendaries" is in selectedExclusions
        const isLegendaryExcluded =
            selectedExclusions.includes("Legendaries") &&
            allLegendaryIds.includes(p.id);

        // Check if any of the Pokémon's types match the types in the selectedExclusions list
        const isTypeExcluded =
            selectedExclusions.some((excludedType) =>
                p.types.some((typeObj) => typeObj.type.name === excludedType)
            );

        return typesMatch && combinedLegendaryPseudoStarterMatches && !isStarterExcluded && !isLegendaryExcluded && !isTypeExcluded;
    });

    return (
        <div className={styles.favoriteContainer}>
            <div className={styles.favoriteHeader}>
                <p className={styles.favoriteLabel}>
                    Showing: {visibleFavoritePokemon.length}
                </p>
                <button onClick={handleClearFavorites} className={styles.clearButton}>Clear Favorites</button>
            </div>
            {favoritePokemon.length === 0 ? emptyFavorites : <PokemonList pokemon={visibleFavoritePokemon} />}
        </div>
    )
}

export default Favorites;