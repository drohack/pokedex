import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPokemon } from "./pokemonSlice";

const Pokemon = () => {
    const dispatch = useDispatch();
    const selectedPokemon = useSelector(selectedPokemon);

}

export default Pokemon;