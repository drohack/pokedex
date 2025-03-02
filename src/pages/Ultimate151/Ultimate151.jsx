import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useKantoPokemonData } from '../../hooks/usePokemonData';
import PokemonListUltimateDrag from '../../components/PokemonListUltimate/PokemonListUltimateDrag';
import PokemonListUltimateDrop from '../../components/PokemonListUltimate/PokemonListUltimateDrop';
import { getFavoritePokemon, getIsFavoritesLoading, clearAllFavorites, toggleFavorite } from "../../features/favorites/favoritesSlice";
import { getUltimate151, getIsUltimate151Loading, addUltimate151, updateUltimate151, moveToNewUltimate151, moveToExistingUltimate151, removeUltimate151ByFavPokemon, clearUltimate151 } from './ultimate151Slice';
import { StartersAndEvolutions, SubLegendaries, Legendaries, Mythical } from "../../utils/index";
import { selectSearchTerm } from "../../components/SearchTerm/searchTermSlice";
import styles from './Ultimate151.module.css';
import ExportUltimate151 from './ExportUltimate151';
import { fetchPokemonDetails } from "../../api/pokeapi/pokeapi";
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

const Ultimate151 = () => {
  const dispatch = useDispatch();
  const { isLoading, error, data: kantoPokemon } = useKantoPokemonData();
  const ultimate151 = useSelector(getUltimate151);
  const isUltimate151Loading = useSelector(getIsUltimate151Loading);
  const ultimate151Ref = useRef(ultimate151);
  const favoritePokemon = useSelector(getFavoritePokemon);
  const isFavoritesLoading = useSelector(getIsFavoritesLoading);
  const [loadingImport, setLoading] = useState(false);
  const divRef = useRef(null);

  const searchTerm = useSelector(selectSearchTerm);
  const selectedTypes = useSelector((state) => state.typeFilter?.selectedTypes || []);
  const selectedPseudoLegendaries = useSelector((state) => state.pseudoLegendaryFilter?.selectedPseudoLegendaries || []);
  const selectedLegendaries = useSelector((state) => state.legendaryFilter?.selectedLegendaries || []);
  const selectedStarters = useSelector((state) => state.starterFilter?.selectedStarters || []);
  const selectedExclusions = useSelector((state) => state.exclusionFilter?.selectedExclusions || []);
  const selectedLocks = useSelector((state) => state.lockedFilter?.selectedLocks || []);

  const lockedPokemon = useSelector((state) => state.favorites.lockedPokemon);
  const lockedPokemonIds = Object.keys(lockedPokemon).map(id => parseInt(id));
  const starterIds = Object.values(StartersAndEvolutions).map(starter => starter.id);
  const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
  const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
  const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
  const allLegendaryIds = [...subLegendaryIds, ...legendaryIds, ...mythicalIds];
  const combinedLegendariesPseudoStarterLockedIds = [ ...selectedLegendaries, ...selectedPseudoLegendaries, ...selectedStarters, ...selectedLocks ];

  useEffect(() => {
    ultimate151Ref.current = ultimate151;
    //console.log("Updated ultimate151:", ultimate151);
  }, [ultimate151]);

  const handleDrop = (favPokemon, kantoPokemon) => {
    const currentUltimate151 = ultimate151Ref.current;
    //console.log("handleDrop called with:", favPokemon.name, kantoPokemon.name);
    //console.log(currentUltimate151);
    // Find the previous entry for the favorite Pokémon
    const previousEntry = currentUltimate151.find(entry => entry.favorite.id === favPokemon.id);
    // Find the existing entry for the Kanto Pokémon
    const existingEntry = currentUltimate151.find(entry => entry.kanto.id === kantoPokemon.id);

    // Update the ultimate 151 list
    if (previousEntry && existingEntry && previousEntry.kanto.id !== kantoPokemon.id) {
      // Remove the previous entry and update the existing entry with the new favorite Pokémon
      dispatch(moveToExistingUltimate151({ kanto: kantoPokemon, favorite: favPokemon }));
    } else if (previousEntry && previousEntry.kanto.id !== kantoPokemon.id) {
      // Remove the previous entry and add a new entry to the ultimate 151 list
      dispatch(moveToNewUltimate151({ kanto: kantoPokemon, favorite: favPokemon }));
    } else if (previousEntry && previousEntry.kanto.id === kantoPokemon.id) {
      // Dropping the favorite Pokémon onto the same Kanto Pokémon, do nothing
      console.log("previousEntry already exists:", previousEntry.kanto.name, previousEntry.favorite.name);
      return;
    } else if (existingEntry) {
      // Update the existing entry with the new favorite Pokémon
      dispatch(updateUltimate151({ kanto: kantoPokemon, favorite: favPokemon }));
    } else {
      // Add a new entry to the ultimate 151 list
      dispatch(addUltimate151({ kanto: kantoPokemon, favorite: favPokemon }));
    }
  };

  const handleRemoveUltimate151 = (favPokemon) => {
    console.log("Removing favorite Pokémon from ultimate 151:", favPokemon.name);
    dispatch(removeUltimate151ByFavPokemon(favPokemon));
  };

  const handleClearUltimate151 = () => {
    dispatch(clearUltimate151());
  };

  const handleImportUltimate151 = async (event) => {
      const file = event.target.files[0];
      if (file) {
          const userConfirmed = window.confirm("Importing a file will clear all favorite and locked Pokemon. Do you want to continue?");
          if (userConfirmed) {
              const file = event.target.files[0];
              if (file) {
                  setLoading(true);
                  const reader = new FileReader();
                  reader.onload = async (e) => {
                      const pokemonPairs = e.target.result.split('\n').map(name => name.trim()).filter(name => name);
                      dispatch(clearAllFavorites());
                      for (const pair of pokemonPairs) {
                          const array = pair.split(' => ');
                          let kantoName = array[0].toLowerCase();
                          let favoriteName = array[0].toLowerCase();
                          if (array.length === 2) {
                              favoriteName = array[1].toLowerCase();
                          }
                          const favoritePokemon = await fetchPokemonDetails(favoriteName);
                          if (favoritePokemon) {
                              dispatch(toggleFavorite(favoritePokemon));
                          }
                          const kantoPokemon = await fetchPokemonDetails(kantoName);
                          if (kantoPokemon) {
                              dispatch(addUltimate151({kanto: kantoPokemon, favorite: favoritePokemon}));
                          }
                      }
                      setLoading(false);
                  };
                  reader.readAsText(file);
              }
          }
      }
  };
  

  const filteredFavoritePokemon = favoritePokemon.filter(
    (fav) => !ultimate151.some((p) => p.favorite.id === fav.id)
  );

  const visibleFavoritePokemon = filteredFavoritePokemon?.filter((p) => {
    // Check if the search term matches the Pokémon name
    const nameMatches = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    const typesMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
        p.types.some((typeObj) => typeObj.type.name === selectedType)
    );

    const combinedLegendariesPseudoStarterLockedMatches = 
        combinedLegendariesPseudoStarterLockedIds.length === 0 || 
        combinedLegendariesPseudoStarterLockedIds.includes(p.id);

    const isStarterExcluded =
        selectedExclusions.includes("Starters") &&
        starterIds.includes(p.id);

    const isLegendaryExcluded =
        selectedExclusions.includes("Legendaries") &&
        allLegendaryIds.includes(p.id);

    const isTypeExcluded =
        selectedExclusions.some((excludedType) =>
            p.types.some((typeObj) => typeObj.type.name === excludedType)
        );
    
    const isLockedExcluded =
        selectedExclusions.includes("Locked") &&
        lockedPokemonIds.includes(p.id);

    return nameMatches && typesMatch && combinedLegendariesPseudoStarterLockedMatches && !isStarterExcluded && !isLegendaryExcluded && !isTypeExcluded && !isLockedExcluded;
  });

  if (isUltimate151Loading || isFavoritesLoading || isLoading || !kantoPokemon) {
    return <LoadingOverlay />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {loadingImport && <LoadingOverlay />}
        <div style={{ marginBottom: '10px', color: '#e5e5e5' }}>Import Ultiamte 151: <input type="file" accept=".txt" onClick={(event) => event.target.value = null} onChange={handleImportUltimate151} className={styles.importButton} /></div>
      </div>
      <div className={styles.titleContainer}>
        <p className={`${styles.left}`}>
            Filled: {ultimate151.length}
        </p>
        <h2>Ultimate 151</h2>
        <button className={styles.clearButton} onClick={handleClearUltimate151}>Clear List</button>
        <ExportUltimate151 kantoPokemon={kantoPokemon} divRef={divRef}/>
        <h2>Favorite Pokemon</h2>
        <p className={`${styles.right}`}>
            Showing: {visibleFavoritePokemon.length}
        </p>
      </div>
      <div className={styles.ultimate151Container}>
        <div ref={divRef} className={styles.pokemonList}>
          <PokemonListUltimateDrop 
            kantoPokemon={kantoPokemon}
            onDrop={handleDrop}
            onRemoveFavorite={handleRemoveUltimate151}
          />
        </div>
        <div className={styles.favoriteList}>
          <PokemonListUltimateDrag 
            pokemon={visibleFavoritePokemon}
            onRemoveFavorite={handleRemoveUltimate151}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Ultimate151;