import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import searchTermReducer from '../components/SearchTerm/searchTermSlice';
import regionsReducer from '../features/regions/regionsSlice';

export default configureStore({
    reducer: {
        pokemon: pokemonReducer,
        searchTerm: searchTermReducer,
        regions: regionsReducer
    }
})