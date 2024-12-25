const POKEAPI_URL = "https://pokeapi.co/api/v2";

export const fetchPokemon = async (limit = 151, offset = 0) => {
  try {
    const response = await fetch(
      `${POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await fetch(`${POKEAPI_URL}/pokemon/${name}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const details = await response.json();
    return {
      id: details.id,
      name: details.name,
      height: details.height,
      weight: details.weight,
      types: details.types,
      abilities: details.abilities,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`,
    };
  } catch (err) {
    console.error("Error fetching pokemon details:", err);
  }
};
