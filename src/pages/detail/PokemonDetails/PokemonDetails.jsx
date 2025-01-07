import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectSelectedPokemon } from "../../../features/pokemon/pokemonSlice";
import styles from "./PokemonDetails.module.css";
import { capitalizeFirstLetter } from "../../../utils";

// Map of type to background color
const typeColors = {
  normal: "#aab09f",
  fire: "#ea7a3c",
  fighting: "#cb5f48",
  water: "#539ae2",
  flying: "#7da6de",
  grass: "#71c558",
  poison: "#b468b7",
  electric: "#e5c531",
  ground: "#cc9f4f",
  psychic: "#e5709b",
  rock: "#b2a061",
  ice: "#70cbd4",
  bug: "#94bc4a",
  dragon: "#6a7baf",
  ghost: "#846ab6",
  dark: "#736c75",
  steel: "#89a1b0",
  fairy: "#e397d1",
};

export const getTypeBackground = (types) => {
  if (types.length === 1) {
    // Single type: use the color of the type
    return {
      background: typeColors[types[0].type.name] || "#ccc", // Default to grey if type is not found
    };
  } else if (types.length === 2) {
    // Two types: split the background
    const firstTypeColor = typeColors[types[0].type.name] || "#ccc";
    const secondTypeColor = typeColors[types[1].type.name] || "#ccc";

    return {
      background: `linear-gradient(to right, ${firstTypeColor} 50%, ${secondTypeColor} 50%)`,
    };
  }
  return {}; // Default (if no types or something unexpected)
};

export const getSingleTypeBackground = (type) => {
  return {
    background: typeColors[type.type.name] || "#ccc", // Default to grey if type is not found
  };
};

export default function PokemonDetails() {
  const { pokemonName } = useParams();
  const selectedPokemon = useSelector(selectSelectedPokemon);
  const navigate = useNavigate();

  // Handle cases where the Pokemon isn't found/loaded yet
  if (!selectedPokemon || selectedPokemon.name !== pokemonName) {
    return <div>Loading... or Pokemon not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  // id, name, height, weight, types, abilities,
  return (
    <>
      <button onClick={handleBack} className={styles.backButton}>Go Back</button>
      <div className={styles.container} style={getTypeBackground(selectedPokemon.types)}>
        {" "}
        {/* Apply container style */}
        <h2>{capitalizeFirstLetter(selectedPokemon.name)}</h2>
        <img
          src={selectedPokemon.imageUrl}
          alt={selectedPokemon.name}
          className={styles.image}
        />{" "}
        {/* Style the image */}
        <div className={styles.types} style={getTypeBackground(selectedPokemon.types)}>
          {" "}
          {/* Container for types */}
          {selectedPokemon.types.map((type, index) => {
            return (
              <p key={index} className={styles.type} style={getSingleTypeBackground(type)}>
                {capitalizeFirstLetter(type.type.name)}
              </p>
            );
          })}
        </div>
        <h4>
          Height: {selectedPokemon.height} | Weight: {selectedPokemon.weight}
        </h4>
      </div>
    </>
  );
}