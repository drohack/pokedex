import { createSlice } from '@reduxjs/toolkit';

const legendaryFilterSlice = createSlice({
  name: 'legendaryFilter',
  initialState: {
    selectedLegendaries: [],
  },
  reducers: {
    setSelectedLegendaries: (state, action) => {
      state.selectedLegendaries = action.payload;
    },
  },
});

export const { setSelectedLegendaries } = legendaryFilterSlice.actions;
export default legendaryFilterSlice.reducer;
