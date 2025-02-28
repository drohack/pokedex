import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import searchTermReducer from '../components/SearchTerm/searchTermSlice';
import regionsReducer from '../features/regions/regionsSlice';
import favoritesReducer from "../features/favorites/favoritesSlice";
import typeFilterReducer from "../components/TypeFilter/typeFilterSlice"
import legendaryFilterReducer from "../components/LegendaryFilter/legendaryFilterSlice"
import starterFilterReducer from "../components/StarterFilter/starterFilterSlice"
import exclusionFilterReducer from "../components/ExclusionFilter/exclusionFilterSlice"
import pseudoLegendaryFilterReducer from '../components/PseudoLegendaryFilter/pseudoLegendaryFilterSlice';
import lockedFilterReducer from '../components/LockedFilter/lockedFilterSlice';
import ultimate151Reducer from '../pages/Ultimate151/ultimate151Slice';

export default configureStore({
    reducer: {
        pokemon: pokemonReducer,
        searchTerm: searchTermReducer,
        regions: regionsReducer,
        favorites: favoritesReducer,
        typeFilter: typeFilterReducer, // Add the typeFilter reducer to the store
        legendaryFilter: legendaryFilterReducer,
        pseudoLegendaryFilter: pseudoLegendaryFilterReducer,
        starterFilter: starterFilterReducer,
        exclusionFilter: exclusionFilterReducer,
        lockedFilter: lockedFilterReducer,
        ultimate151: ultimate151Reducer,
    },
    devTools: true
})