import { createSlice } from '@reduxjs/toolkit';

const starterFilterSlice = createSlice({
  name: 'starterFilter',
  initialState: {
    selectedStarters: [],
  },
  reducers: {
    setSelectedStarters: (state, action) => {
      state.selectedStarters = action.payload;
    },
  },
});

export const { setSelectedStarters } = starterFilterSlice.actions;
export default starterFilterSlice.reducer;
