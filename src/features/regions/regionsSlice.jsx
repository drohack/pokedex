import { createSlice } from "@reduxjs/toolkit";
import { Regions } from "../../utils";

const options = {
    name: 'regions',
    initialState: {
        region: 'KANTO'
    },
    reducers: {
        setRegion: (state, action) => {
            state.region = action.payload;
        }
    }
}

export const regionsSlice = createSlice(options);
export const selectRegion = (state) => state.regions.region;

export const { setRegion } = regionsSlice.actions;
export default regionsSlice.reducer;