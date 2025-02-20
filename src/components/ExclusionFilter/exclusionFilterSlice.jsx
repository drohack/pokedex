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
    clearLockedFromExclusions: (state) => {
      state.selectedExclusions = state.selectedExclusions.filter(exclusion => exclusion !== "Locked");
    },
    clearTypeFromExclusions: (state, action) => {
      const typeToRemove = action.payload;
      state.selectedExclusions = state.selectedExclusions.filter(
        (exclusion) => exclusion !== typeToRemove
      );
    },
  },
});

export const { setSelectedExclusions, clearLegendariesFromExclusions, clearStartersFromExclusions, clearTypeFromExclusions, clearLockedFromExclusions } = exclusionFilterSlice.actions;
export default exclusionFilterSlice.reducer;