import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'favorites',
    initialState: {
        favoritePokemon: []
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const pokemonToToggle = action.payload;
            const isAlreadyFavorite = state.favoritePokemon.some(pokemon => pokemon.id === pokemonToToggle.id);

            if (isAlreadyFavorite) {
                state.favoritePokemon = state.favoritePokemon.filter(pokemon => pokemon.id !== pokemonToToggle.id);
            } else {
                state.favoritePokemon.push(pokemonToToggle);
            }
        },
        removeFavorite: (state, action) => {
            state.favoritePokemon = state.favoritePokemon.filter(pokemon => pokemon.id !== action.payload.id)
        }
    }
}

export const favoritesSlice = createSlice(options);
export const getFavoritePokemon = (state) => state.favorites.favoritePokemon;
export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;