import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        selectedPokemon: null,
    },
    reducers: {
        setSelectedPokemon: (state, action) => {
            state.selectedPokemon = action.payload;
        },
    }
})

export const { setSelectedPokemon } = pokemonSlice.actions;
export const selectSelectedPokemon = (state) => state.pokemon.selectedPokemon;
export default pokemonSlice.reducer;