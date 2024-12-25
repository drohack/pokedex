import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokemonData } from "../../data/pokemonData"; // Optional (if used for initial data)
import { fetchPokemon, fetchPokemonDetails } from "../../api/pokeapi/pokeapi";
import { Regions } from "../regions/regionsSlice";
import { useMemo } from "react";

export const getPokemonData = createAsyncThunk(
  "pokemon/getPokemonData",
  async (region, thunkAPI) => {
    const { limit, offset } = Regions[region]; // Direct lookup - correct and efficient
    try {
        const data = await fetchPokemon(limit, offset);

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => await fetchPokemonDetails(pokemon.name))
        );
    
        // Filter out any null values (from failed fetches)
        const validPokemon = detailedPokemon.filter(pokemon => pokemon !== null);
    
        return validPokemon;
      } catch (error) {
        console.error("Error in getPokemonData", error)
        return thunkAPI.rejectWithValue(error.message)
      }
  }
);

const options = {
  name: "pokemon",
  initialState: {
    pokemon: [],
    selectedPokemon: null,
    isLoadingPokemon: false,
    errorLoadingPokemon: false,
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
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

        state.pokemon = action.payload.map((pokemon, index) => ({ 
          ...pokemon, 
          id: index+1 }
        )); 
      });
  },
};

export const pokemonSlice = createSlice(options);

export const selectPokemon = (state) => state.pokemon.pokemon;
export const isLoadingPokemon = (state) => state.isLoadingPokemon;
export const errorLoadingPokemon = (state) => state.errorLoadingPokemon;
export const selectSelectedPokemon = (state) => state.pokemon.selectedPokemon;

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;