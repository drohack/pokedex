import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData, selectPokemon } from "../../features/pokemon/pokemonSlice";
import PokemonList from "../../components/PokemonList/PokemonList";
import SearchTerm from "../../components/SearchTerm/SearchTerm";
import styles from "./Home.module.css";
import { selectSearchTerm, setSearchTerm } from "../../components/SearchTerm/searchTermSlice";
import { selectRegion, setRegion, Regions } from "../../features/regions/regionsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const pokemon = useSelector(selectPokemon);
    const [displayedPokemon, setDisplayedPokemon] = useState([]);
    const selectedRegion = useSelector(selectRegion);
    const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        dispatch(getPokemonData(selectedRegion));
    }, [dispatch, selectedRegion]);

    useEffect(() => {
        console.log(pokemon);
        if (pokemon) {
            setDisplayedPokemon(pokemon);
        }
    }, [pokemon]);

    useEffect(() => {
        const filteredPokemon = pokemon.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedPokemon(filteredPokemon);
    }, [searchTerm, pokemon]);

    const handleSelect = ({ target }) => {
        dispatch(setRegion(target.value));
    };

    const handleSearchChange = ({ target }) => {
        dispatch(setSearchTerm(target.value));
    };

    return (
        <div className={styles.homeContainer}>
            <h1>Pokedex</h1>

            <div className={styles.selectContainer}>
                <label htmlFor="region-select" className={styles.label}>
                    Choose a region:
                </label>
                <select
                    name="regions"
                    id="region-select"
                    value={selectedRegion}
                    onChange={handleSelect}
                    className={styles.select}
                >
                    {Object.keys(Regions).map((regionName) => (
                        <option key={regionName} value={regionName}>
                            {regionName}
                        </option>
                    ))}
                </select>
            </div>

            <SearchTerm searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <PokemonList pokemon={displayedPokemon} />
        </div>
    );
};

export default Home;