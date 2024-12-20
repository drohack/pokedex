import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice'
import searchTermReducer from '../features/searchTerm/searchTermSlice'

export default configureStore({
    reducer: {
        pokemon: pokemonReducer,
        searchTerm: searchTermReducer
    }
})