import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from "../../db/db";

export const initializeFavorites = createAsyncThunk(
  'favorites/initializeFavorites',
  async () => {
    try {
      const favoritesFromDb = await db.favorites.toArray();
      return favoritesFromDb;
    } catch (error) {
      console.error("Error initializing favorites:", error);
      return [];
    }
  }
);

export const initializeLocks = createAsyncThunk(
  'favorites/initializeLocks',
  async () => {
    try {
      const locksFromDb = await db.locks.toArray();
      return locksFromDb.reduce((acc, lock) => {
        acc[lock.id] = true;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error initializing locks:", error);
      return {};
    }
  }
);

const options = {
  name: "favorites",
  initialState: {
    favoritePokemon: [],
    lockedPokemon: [],
    isLoading: false,
    error: false
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemonToToggle = action.payload;
      const index = state.favoritePokemon.findIndex(
        (pokemon) => pokemonToToggle.id === pokemon.id
      );

      if (index !== -1) {
        state.favoritePokemon.splice(index, 1);
        db.favorites.delete(pokemonToToggle.id);
      } else {
        state.favoritePokemon.push(pokemonToToggle);
        db.favorites.add(pokemonToToggle);
      }
    },
    removeFavorite: (state, action) => {
      const pokemonToRemove = action.payload;
      state.favoritePokemon = state.favoritePokemon.filter(
        (pokemon) => pokemon.id !== pokemonToRemove.id
      );
      db.favorites.delete(pokemonToRemove.id);
    },
    clearNotLockedFavorites: (state) => {
      state.favoritePokemon = state.favoritePokemon.filter((pokemon) => {
        if (!state.lockedPokemon[pokemon.id]) {
          db.favorites.delete(pokemon.id);
          return false;
        }
        return true;
      });
    },
    clearAllFavorites: (state) => {
      state.favoritePokemon = [];
      db.favorites.clear();
      state.lockedPokemon = {};
      db.locks.clear();
      console.log("Cleared all favorites and locks");
    },
    toggleLock: (state, action) => {
      const pokemonToToggle = action.payload;
      if (state.lockedPokemon[pokemonToToggle.id]) {
        delete state.lockedPokemon[pokemonToToggle.id];
        db.locks.delete(pokemonToToggle.id);
      } else {
        state.lockedPokemon[pokemonToToggle.id] = true;
        db.locks.add({ id: pokemonToToggle.id });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(initializeFavorites.fulfilled, (state, action) => {
        state.favoritePokemon = action.payload;
        state.isLoading = false;
      })
      .addCase(initializeFavorites.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        console.error("Failed to load favorite pokemon");
      })
      .addCase(initializeLocks.fulfilled, (state, action) => {
        state.lockedPokemon = action.payload;
      });
  }
};

export const favoritesSlice = createSlice(options);

export const { toggleFavorite, removeFavorite, toggleLock, clearNotLockedFavorites, clearAllFavorites } = favoritesSlice.actions;

export const getFavoritePokemon = (state) => [...state.favorites.favoritePokemon].sort((a, b) => a.id - b.id);
export const getLockedPokemon = (state) => state.favorites.lockedPokemon;
export const getIsFavoritesLoading = (state) => state.favorites.isLoading;

export default favoritesSlice.reducer;
