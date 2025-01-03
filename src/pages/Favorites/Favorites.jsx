import styles from "./Favorites.module.css";
import PokemonList from "../../components/PokemonList/PokemonList";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../../db/db";
import { useSelector } from "react-redux";
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";

function Favorites() {
    const favoritePokemon = useSelector(getFavoritePokemon);

    const emptyFavorites = <p>No favorite Pokemon</p>

    return (
        <>
            <h1>Favorites</h1>
            {favoritePokemon.length === 0 ? emptyFavorites : <PokemonList pokemon={ favoritePokemon } />}
        </>
    )
}

export default Favorites;