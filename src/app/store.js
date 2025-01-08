import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import searchTermReducer from '../components/SearchTerm/searchTermSlice';
import regionsReducer from '../features/regions/regionsSlice';
import favoritesReducer from "../features/favorites/favoritesSlice";
import typeFilterReducer from "../components/TypeFilter/typeFilterSlice"
import legendaryFilterReducer from "../components/LegendaryFilter/legendaryFilterSlice"
import starterFilterReducer from "../components/StarterFilter/starterFilterSlice"
import exclusionFilterReducer from "../components/ExclusionFilter/exclusionFilterSlice"

export default configureStore({
    reducer: {
        pokemon: pokemonReducer,
        searchTerm: searchTermReducer,
        regions: regionsReducer,
        favorites: favoritesReducer,
        typeFilter: typeFilterReducer, // Add the typeFilter reducer to the store
        legendaryFilter: legendaryFilterReducer,
        starterFilter: starterFilterReducer,
        exclusionFilter: exclusionFilterReducer,
    },
    devTools: true
})