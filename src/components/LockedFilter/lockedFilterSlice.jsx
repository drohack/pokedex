import { createSlice } from '@reduxjs/toolkit';

const lockedFilterSlice = createSlice({
  name: 'lockedFilter',
  initialState: {
    selectedLocks: [],
  },
  reducers: {
    setSelectedLocks: (state, action) => {
      state.selectedLocks = action.payload;
    },
  },
});

export const { setSelectedLocks } = lockedFilterSlice.actions;
export default lockedFilterSlice.reducer;
