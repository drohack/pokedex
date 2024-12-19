import { createSlice } from "@reduxjs/toolkit";
import { pokemonData } from "../../data/pokemonData";

const options = {
  name: "pokemon",
  initialState: {
    pokemon: pokemonData,
    selectedPokemon: null
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    }
  },
};

export const pokemonSlice = createSlice(options);

export const selectPokemon = (state) => state.pokemon.pokemon;
export const selectSelectedPokemon = (state) => state.pokemon.selectedPokemon; // Corrected line

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;