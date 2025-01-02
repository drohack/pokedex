import styles from "./Favorites.module.css";
import NavBar from "../../components/NavBar/NavBar";
import PokemonList from "../../components/PokemonList/PokemonList";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";

function Favorites() {
    const dispatch = useDispatch();
    const favoritePokemon = useSelector(getFavoritePokemon);
    console.log(favoritePokemon);

    const emptyFavorites = <p>No favorite Pokemon</p>

    return (
        <>
            <h1>Favorites</h1>
            <NavBar />
            {favoritePokemon.length === 0 ? emptyFavorites : <PokemonList pokemon={ favoritePokemon } />}
        </>
    )
}

export default Favorites;