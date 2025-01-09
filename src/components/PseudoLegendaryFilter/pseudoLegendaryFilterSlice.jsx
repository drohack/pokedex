import { createSlice } from '@reduxjs/toolkit';

const pseudoLegendaryFilterSlice = createSlice({
  name: 'pseudoLegendaryFilter',
  initialState: {
    selectedPseudoLegendaries: [],
  },
  reducers: {
    setSelectedPseudoLegendaries: (state, action) => {
      state.selectedPseudoLegendaries = action.payload;
    },
  },
});

export const { setSelectedPseudoLegendaries } = pseudoLegendaryFilterSlice.actions;
export default pseudoLegendaryFilterSlice.reducer;
