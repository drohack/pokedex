import React from "react";

// Redux + React Query
import { useSelector } from "react-redux";
import { usePokemonData } from "../../hooks/usePokemonData";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";

// Components
import PokemonList from "../../components/PokemonList/PokemonList";

// Styles
import styles from "./home.module.css";

// Import the Pokemon lists
import { StartersAndEvolutions, SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from "../../utils/index";

// Get the favorite Pokemon from the Redux state
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";

import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

const Home = () => {
  const searchTerm = useSelector(selectSearchTerm);

  const { isLoading, error, data: pokemon } = usePokemonData();
  console.log(`Pokemon data: ${pokemon?.length}`)

  // Get selected types from Redux state
  const selectedTypes = useSelector((state) => state.typeFilter?.selectedTypes || []);
  // Get selected legendaries from Redux state
  const selectedLegendaries = useSelector((state) => state.legendaryFilter?.selectedLegendaries || []);
  // Get selected legendaries from Redux state
  const selectedPseudoLegendaries = useSelector((state) => state.pseudoLegendaryFilter?.selectedPseudoLegendaries || []);
  // Get selected starters from Redux state
  const selectedStarters = useSelector((state) => state.starterFilter?.selectedStarters || []);
  // Get selected locks from Redux state
  const selectedLocks = useSelector((state) => state.lockedFilter?.selectedLocks || []);
  // Get selected exclusions from Redux state
  const selectedExclusions = useSelector((state) => state.exclusionFilter?.selectedExclusions || []);

  // Get the favorite Pokemon from the Redux state
  const favoritePokemon = useSelector(getFavoritePokemon);
  // Convert favoritePokemon to an array of IDs
  const favoriteIds = favoritePokemon.map(fav => fav.id);
  // Get the locked Pokemon from the Redux state
  const lockedPokemon = useSelector((state) => state.favorites.lockedPokemon);
  const lockedPokemonIds = Object.keys(lockedPokemon).map(id => parseInt(id));

  // Convert StartersAndEvolutions object to an array of IDs
  const starterIds = Object.values(StartersAndEvolutions).map(starter => starter.id);

  // Convert PseudoLegendaries, SubLegendaries, Legendaries, and Mythical objects to arrays of IDs
  const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
  const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
  const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);

  // Combine all legendary-related IDs into a single array
  const allLegendaryIds = [...subLegendaryIds, ...legendaryIds, ...mythicalIds];

  // Check if any selected legendaries are in the SubLegendaries list
  const combinedLegendariesPseudoStarterLockedIds = [ ...selectedLegendaries, ...selectedPseudoLegendaries, ...selectedStarters, ...selectedLocks ];


  // Filter Pokemon based on Search Filter, selected Types, and selected Legendaries
  const visiblePokemon = pokemon?.filter((p) => {
    // Check if the search term matches the Pokémon name
    const nameMatches = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if any selected types match the Pokémon types
    const typesMatch = 
        selectedTypes.length === 0 || 
        selectedTypes.every((selectedType) =>
            p.types.some((typeObj) => typeObj.type.name === selectedType)
        );

    // Check if the Pokémon's ID is in the selected legendaries list (or if none are selected)
    const combinedLegendaryPseudoStarterLockedMatches = 
      combinedLegendariesPseudoStarterLockedIds.length === 0 || 
      combinedLegendariesPseudoStarterLockedIds.includes(p.id);

    // Check if the Pokémon's ID is in the favoriteIds list if "Favorites" is in selectedExclusions
    const isFavoriteExcluded = 
        selectedExclusions.includes("Favorites") && 
        favoriteIds.includes(p.id);

    // Check if the Pokémon's ID is in the lockedIds list if "Locked" is in selectedExclusions
    const isLockedExcluded = 
        selectedExclusions.includes("Locked") && 
        lockedPokemonIds.includes(p.id);

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

    // Only include the Pokémon if all conditions are true
    return nameMatches && typesMatch && combinedLegendaryPseudoStarterLockedMatches && !isFavoriteExcluded && !isStarterExcluded && !isLegendaryExcluded && !isTypeExcluded && !isLockedExcluded;
  });

  return (
    <div className={styles.homeContainer}>

      {isLoading && <LoadingOverlay />}

      {error && <p>An error has occurred: {error.message}</p>}

      {pokemon && (
        <>
          <PokemonList
            pokemon={visiblePokemon}
          />
        </>
      )}
    </div>
  );
};

export default Home;
