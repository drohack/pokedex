import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectSelectedPokemon } from "../../../features/pokemon/pokemonSliceV1";
import styles from "./PokemonDetails.module.css";
import { capitalizeFirstLetter } from "../../../utils";

export default function PokemonDetails() {
  const { pokemonName } = useParams();
  const selectedPokemon = useSelector(selectSelectedPokemon);
  const types = selectedPokemon.types.map(({ type }) => type.name);
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
      <div className={styles.container}>
        {" "}
        {/* Apply container style */}
        <h2>{capitalizeFirstLetter(selectedPokemon.name)}</h2>
        <img
          src={selectedPokemon.imageUrl}
          alt={selectedPokemon.name}
          className={styles.image}
        />{" "}
        {/* Style the image */}
        <div className={styles.types}>
          {" "}
          {/* Container for types */}
          {selectedPokemon.types.map((type, index) => {
            return (
              <p key={index} className={styles.type}>
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
