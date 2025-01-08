import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../db/db";

export const initializeFavorites = createAsyncThunk(
  "favorites/initializeFavorites",
  async () => {
    try {
      console.log("Start favorite init"); // Debugging log
      const favoritesFromDb = await db.favorites.toArray();
      console.log("Favorites from DB:", favoritesFromDb); // Debugging log
      return favoritesFromDb;
    } catch (error) {
      console.error("Error initializing favorites:", error);
      return [];
    }
  }
);

const options = {
  name: "favorites",
  initialState: {
    favoritePokemon: [],
    isLoading: false,
    error: false
  },
  reducers: {
    toggleFavorite: (state, action) => {
      // console.log(`Toggling favorite ${action}`);
      const pokemonToToggle = action.payload;
      const index = state.favoritePokemon.findIndex(
        (pokemon) => pokemonToToggle.id === pokemon.id
      );

      if (index !== -1) {
        state.favoritePokemon.splice(index, 1);
        db.favorites.delete(pokemonToToggle.id);
        // console.log(`Unfavorited ${Object.keys(pokemonToToggle)}`);
      } else {
        state.favoritePokemon.push(pokemonToToggle);
        db.favorites.add(pokemonToToggle);
        // console.log(`Favorited ${Object.keys(pokemonToToggle)}`);
      }
    },
    removeFavorite: (state, action) => {
      const pokemonToRemove = action.payload;
      state.favoritePokemon = state.favoritePokemon.filter(
        (pokemon) => pokemon.id !== pokemonToRemove.id
      );
      db.favorites.delete(pokemonToRemove.id);
    },
    clearAllFavorites: (state) => {
      state.favoritePokemon = [];
      db.favorites.clear();
      console.log("Cleared all favorites"); // Debugging log
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        console.log("Loading favorite pokemon");
      })
      .addCase(initializeFavorites.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        console.log("Failed to load favorite pokemon");
      })
      .addCase(initializeFavorites.fulfilled, (state, action) => {
        state.favoritePokemon = action.payload;
        console.log("Succesfully loaded favorite pokemon");
      });
  },
};

export const favoritesSlice = createSlice(options);
export const getFavoritePokemon = (state) => state.favorites.favoritePokemon;
export const { toggleFavorite, removeFavorite, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
