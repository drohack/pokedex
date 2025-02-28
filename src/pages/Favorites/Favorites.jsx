import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Favorites.module.css";
import PokemonList from "../../components/PokemonList/PokemonList";
import ExportFavorites from './ExportFavorites';
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../db/db";
import { getFavoritePokemon, clearNotLockedFavorites, clearAllFavorites, toggleFavorite, getIsFavoritesLoading } from "../../features/favorites/favoritesSlice";
import { StartersAndEvolutions, PseudoLegendaries, SubLegendaries, Legendaries, Mythical } from "../../utils/index";
import { fetchPokemonDetails } from "../../api/pokeapi/pokeapi";
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

function Favorites() {
    const dispatch = useDispatch();
    const favoritePokemon = useSelector(getFavoritePokemon);
    const isFavoritesLoading = useSelector(getIsFavoritesLoading);
    const [loadingImport, setLoading] = useState(false);

    const emptyFavorites = <p>No favorite Pokemon</p>

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

    const handleClearFavorites = () => {
        if (window.confirm('Do you want to clear your favorites?')) {
            dispatch(clearNotLockedFavorites());
        }
    };

    const handleClearAllFavorites = () => {
        if (window.confirm('Do you want to clear all favorites and locks?')) {
            dispatch(clearAllFavorites());
        }
    };

    const handleImportFavorites = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const userConfirmed = window.confirm("Importing a file will clear all favorite and locked Pokemon. Do you want to continue?");
            if (userConfirmed) {
                const file = event.target.files[0];
                if (file) {
                    setLoading(true);
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        const pokemonNames = e.target.result.split('\n').map(name => name.trim()).filter(name => name);
                        dispatch(clearAllFavorites());
                        for (const name of pokemonNames) {
                            const pokemon = await fetchPokemonDetails(name.toLowerCase());
                            if (pokemon) {
                                dispatch(toggleFavorite(pokemon));
                            }
                        }
                        setLoading(false);
                    };
                    reader.readAsText(file);
                }
            }
        }
    };

    const visibleFavoritePokemon = favoritePokemon?.filter((p) => {
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

        return typesMatch && combinedLegendariesPseudoStarterLockedMatches && !isStarterExcluded && !isLegendaryExcluded && !isTypeExcluded && !isLockedExcluded;
    });

    if (isFavoritesLoading) {
        return <LoadingOverlay />;
    }

    return (
        <div className={styles.favoriteContainer}>
            {loadingImport && <LoadingOverlay />}
            <div style={{ marginBottom: '10px' }}>Import Favorites: <input type="file" accept=".txt" onClick={(event) => event.target.value = null} onChange={handleImportFavorites} className={styles.importButton} /></div>
            {visibleFavoritePokemon.length > 0 && (
            <div className={styles.favoriteHeader}>
                <p className={`${styles.favoriteLabel} ${styles.left}`}>
                    Showing: {visibleFavoritePokemon.length}
                </p>
                <div className={styles.centered}>
                    <ExportFavorites/>
                </div>
                <div className={styles.right}>
                    <button onClick={handleClearFavorites} className={styles.clearButton}>Clear Favorites</button>
                    <button onClick={handleClearAllFavorites} className={styles.clearButton}>Clear Favorites & Locks</button>
                </div>
            </div>
            )}
            {favoritePokemon.length === 0 ? emptyFavorites : <PokemonList pokemon={visibleFavoritePokemon} />}
        </div>
    )
}

export default Favorites;