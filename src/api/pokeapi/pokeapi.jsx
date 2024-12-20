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

    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
