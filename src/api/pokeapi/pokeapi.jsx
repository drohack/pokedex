import { Regions } from "../../utils";

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
    return null;
  }
};

export const fetchPokemonData = async (region) => {
  const { limit, offset } = Regions[region];

  try {
    const data = await fetchPokemon(limit, offset);
    if (!data.results) {
      throw new Error("No results found");
    }

    const detailedPokemon = await Promise.all(
      data.results.map(
        async (pokemon) => await fetchPokemonDetails(pokemon.name)
      )
    );

    // Filter out any null values (from failed fetches)
    const validPokemon = detailedPokemon.filter((pokemon) => pokemon !== null);

    // If the region is a form, filter out the forms that don't match the region
    if (region.endsWith("_form")) {
      const formName = "-" + region.split("_")[0].toLowerCase();
      return validPokemon.filter(pokemon => pokemon.name.includes(formName) && !pokemon.name.includes('-totem-')  && !pokemon.name.endsWith('-cap'));
    } else if (region === "MEGA") {
      return validPokemon.filter(pokemon => pokemon.name.includes("-mega"));
    } else if (region === "GMAX") {
      return validPokemon.filter(pokemon => pokemon.name.endsWith("-gmax"));
    }

    return validPokemon;
  } catch (err) {
    console.error("Error fetching pokemon data", err);
    throw err;
  }
};
