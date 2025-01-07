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

  // Filter Pokemon based on Search Filter and selected Types
  const visiblePokemon = pokemon?.filter((p) => {
    // Check if the search term matches the Pokémon name
    const nameMatches = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if any selected types match the Pokémon types
    const typesMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
        p.types.some((typeObj) => typeObj.type.name === selectedType)
    );

    // Only include the Pokémon if both conditions are true
    return nameMatches && typesMatch;
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
