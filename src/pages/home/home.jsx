import React from "react";

// Redux + React Query
import { useSelector } from "react-redux";
import { usePokemonData } from "../../hooks/usePokemonData";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";

// Components
import PokemonList from "../../components/PokemonList/PokemonList";

// Styles
import styles from "./Home.module.css";

const Home = () => {
  const searchTerm = useSelector(selectSearchTerm);

  const { isLoading, error, data: pokemon } = usePokemonData();
  console.log(`Pokemon data: ${pokemon?.length}`)

  // Get selected types from Redux state
  const selectedTypes = useSelector((state) => state.typeFilter?.selectedTypes || []);
  // Get selected legendaries from Redux state
  const selectedLegendaries = useSelector((state) => state.legendaryFilter?.selectedLegendaries || []);
  // Get selected starters from Redux state
  const selectedStarters = useSelector((state) => state.starterFilter?.selectedStarters || []);

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
    const legendaryMatches = 
        selectedLegendaries.length === 0 || 
        selectedLegendaries.includes(p.id);
    
    // Check if the Pokémon's ID is in the selected starters list (or if none are selected)
    const starterMatches = 
        selectedStarters.length === 0 || 
        selectedStarters.includes(p.id);

    // Only include the Pokémon if all conditions are true
    return nameMatches && typesMatch && legendaryMatches && starterMatches;
  });

  return (
    <div className={styles.homeContainer}>

      {isLoading && <p>Loading...</p>}

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
