import { createSlice } from '@reduxjs/toolkit';

const exclusionFilterSlice = createSlice({
  name: 'exclusionFilter',
  initialState: {
    selectedExclusions: [],
  },
  reducers: {
    setSelectedExclusions: (state, action) => {
      state.selectedExclusions = action.payload;
    },
    clearLegendariesFromExclusions: (state) => {
      state.selectedExclusions = state.selectedExclusions.filter(exclusion => exclusion !== "Legendaries");
    },
    clearStartersFromExclusions: (state) => {
      state.selectedExclusions = state.selectedExclusions.filter(exclusion => exclusion !== "Starters");
    },
  },
});

export const { setSelectedExclusions, clearLegendariesFromExclusions, clearStartersFromExclusions } = exclusionFilterSlice.actions;
export default exclusionFilterSlice.reducer;
