import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'searchTerm',
    initialState: {
        searchTerm: ''
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchTerm = "";
        }
    }
}

export const searchTermSlice = createSlice(options);
export const selectSearchTerm = (state) => state.searchTerm.searchTerm;

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;