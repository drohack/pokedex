import { createSlice } from '@reduxjs/toolkit';

const typeFilterSlice = createSlice({
  name: 'typeFilter',
  initialState: {
    selectedTypes: [],
  },
  reducers: {
    setSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
    },
  },
});

export const { setSelectedTypes } = typeFilterSlice.actions;
export default typeFilterSlice.reducer;
