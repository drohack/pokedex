import { createSlice } from "@reduxjs/toolkit";
import { pokemonData } from "../../data/pokemonData";

const options = {
  name: "pokemon",
  initialState: {
    pokemon: pokemonData,
    selectedPokemon: null,
    searchTerm: "",
    selectedTypes: [],
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
    },
  },
};

export const pokemonSlice = createSlice(options);

export const selectPokemon = (state) => state.pokemon.pokemon;
export const selectSearchTerm = (state) => state.pokemon.searchTerm;
export const selectSelectedTypes = (state) => state.pokemon.selectedTypes;

export const { setSelectedPokemon, setSearchTerm, setSelectedTypes } = pokemonSlice.actions;
export default pokemonSlice.reducer;
