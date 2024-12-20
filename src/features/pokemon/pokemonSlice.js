import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokemonData } from "../../data/pokemonData";
import { fetchPokemon, fetchPokemonDetails } from "../../api/pokeapi/pokeapi";

export const getPokemonData = createAsyncThunk(
  "pokemon/getPokemonData",
  async ({ limit, offset }, thunkAPI) => {
    const data = await fetchPokemon(limit, offset);

    const detailedPokemon = await Promise.all(
      data.results.map(async (pokemon) => {
        const { id, name, height, weight, types, abilities } =
          await fetchPokemonDetails(pokemon.name);

        const detailedPokemon = {
          id,
          name,
          height,
          weight,
          types,
          abilities,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
        return detailedPokemon;
      })
    );

    return detailedPokemon;
  }
);

const options = {
  name: "pokemon",
  initialState: {
    pokemon: [],
    selectedPokemon: null,
    region: "KANTO",
    isLoadingPokemon: false,
    errorLoadingPokemon: false,
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonData.pending, (state) => {
        state.isLoadingPokemon = true;
        state.errorLoadingPokemon = false;
      })
      .addCase(getPokemonData.rejected, (state) => {
        state.isLoadingPokemon = false;
        state.errorLoadingPokemon = true;
      })
      .addCase(getPokemonData.fulfilled, (state, action) => {
        state.isLoadingPokemon = false;
        state.errorLoadingPokemon = false;

        state.pokemon = action.payload; //Add index to pokemon
      });
  },
};

export const pokemonSlice = createSlice(options);

export const selectPokemon = (state) => state.pokemon.pokemon;
export const isLoadingPokemon = (state) => state.isLoadingPokemon;
export const errorLoadingPokemon = (state) => state.errorLoadingPokemon;
export const selectSelectedPokemon = (state) => state.pokemon.selectedPokemon;
export const selectRegion = (state) => state.pokemon.region;

export const { setSelectedPokemon, setRegion } = pokemonSlice.actions;
export default pokemonSlice.reducer;
