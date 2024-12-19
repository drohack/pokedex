import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectSelectedPokemon } from "../../features/pokemon/pokemonSlice";

export default function PokemonDetails() {
  const { pokemonId } = useParams();
  const selectedPokemon = useSelector(selectSelectedPokemon);

  console.log(selectedPokemon); // This will now log the selected Pokemon or null

  // Handle cases where the Pokemon isn't found/loaded yet
  if (!selectedPokemon || selectedPokemon.id !== parseInt(pokemonId)) {
    return <div>Loading... or Pokemon not found</div>;
  }

  return (
    <div>
      <h2>{selectedPokemon.name}</h2>
      <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
    </div>
  );
}