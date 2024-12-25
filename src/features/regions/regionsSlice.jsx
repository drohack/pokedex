import { createSlice } from "@reduxjs/toolkit";

const entryRange = (limit, offset) => {
    return {
      limit: limit,
      offset: offset,
    };
  };

export const Regions = {
  KANTO: entryRange(151, 0),
  JOHTO: entryRange(100, 151),
  HOENN: entryRange(135, 251),
  SINNOH: entryRange(107, 386),
  UNOVA: entryRange(156, 493),
  KALOS: entryRange(72, 649),
  ALOLA: entryRange(88, 721),
  GALAR: entryRange(96, 809),
  PALDEA: entryRange(120, 905),
};

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