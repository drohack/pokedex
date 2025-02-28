import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../db/db';

export const initializeUltimate151 = createAsyncThunk(
  'ultimate151/initializeUltimate151',
  async () => {
    try {
      const ultimate151FromDb = await db.ultimate151.toArray();
      return ultimate151FromDb;
    } catch (error) {
      console.error("Error initializing ultimate151:", error);
      return [];
    }
  }
);

const ultimate151Slice = createSlice({
  name: 'ultimate151',
  initialState: {
    ultimate151: [],
    isLoading: false,
    error: false
  },
  reducers: {
    addUltimate151: (state, action) => {
      // Add the new entry to the state
      state.ultimate151.push(action.payload);
      db.ultimate151.add(action.payload);
    },
    updateUltimate151: (state, action) => {
      // Update the entry in the state
      const ultimatePair = action.payload;
      state.ultimate151 = state.ultimate151.map(e => 
        e.kanto.id === ultimatePair.kanto.id 
          ? { ...e, favorite: ultimatePair.favorite } 
          : e
      );
      // Find the entry in the database that matches the kantoPokemon
      db.ultimate151.where('kanto.id').equals(ultimatePair.kanto.id).first().then((entry) => {
        if (entry) {
          // Update the favorite pokemon in the database
          db.ultimate151.update(entry.id, { favorite: ultimatePair.favorite });
        }
      }).catch((error) => {
        console.error("Failed to update ultimate 151 entry:", error);
      });
    },
    moveToExistingUltimate151: (state, action) => {
      // Remove, then update the entry in the state
      const ultimatePair = action.payload;
      state.ultimate151 = state.ultimate151.filter(e => e.favorite.id !== ultimatePair.favorite.id);
      state.ultimate151 = state.ultimate151.map(e =>
        e.kanto.id === ultimatePair.kanto.id
          ? { ...e, favorite: ultimatePair.favorite }
          : e
      );
      // Find the entry in the database that matches the favoritePokemon
      db.ultimate151.where('favorite.id').equals(ultimatePair.favorite.id).first().then((entry) => {
        if (entry) {
          // Delete the entry from the database using its unique identifier
          db.ultimate151.delete(entry.id);
        }
      }).catch((error) => {
        console.error("Failed to delete ultimate 151 entry (move):", error);
      });
      // Find the entry in the database that matches the kantoPokemon
      db.ultimate151.where('kanto.id').equals(ultimatePair.kanto.id).first().then((entry) => {
        if (entry) {
          // Update the favorite pokemon in the database
          db.ultimate151.update(entry.id, { favorite: ultimatePair.favorite });
        }
      }
      ).catch((error) => {
        console.error("Failed to update ultimate 151 entry (move):", error);
      });
    },
    moveToNewUltimate151: (state, action) => {
      // Remove, then add the entry in the state
      const ultimatePair = action.payload;
      state.ultimate151 = state.ultimate151.filter(e => e.favorite.id !== ultimatePair.favorite.id);
      state.ultimate151.push(action.payload);
      // Find the entry in the database that matches the favoritePokemon
      db.ultimate151.where('favorite.id').equals(ultimatePair.favorite.id).first().then((entry) => {
        if (entry) {
          // Delete the entry from the database using its unique identifier
          db.ultimate151.delete(entry.id);
        }
      }).catch((error) => {
        console.error("Failed to delete ultimate 151 entry (move):", error);
      });
      // Add new entry to the database
      db.ultimate151.add(action.payload);
    },
    removeUltimate151ByFavPokemon: (state, action) => {
      // Remove the entry by id from the state
      const favPokemon = action.payload;
      state.ultimate151 = state.ultimate151.filter(e => e.favorite.id !== favPokemon.id);
      // Find the entry in the database that matches the favoritePokemon
      db.ultimate151.where('favorite.id').equals(favPokemon.id).first().then((entry) => {
        if (entry) {
          // Delete the entry from the database using its unique identifier
          db.ultimate151.delete(entry.id);
        }
      }).catch((error) => {
        console.error("Failed to delete ultimate 151 entry:", error);
      });
    },
    clearUltimate151: (state) => {
      state.ultimate151 = [];
      db.ultimate151.clear().then(() => {
        console.log("Cleared ultimate 151");
      }).catch((error) => {
        console.error("Failed to clear ultimate 151:", error);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUltimate151.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(initializeUltimate151.fulfilled, (state, action) => {
        state.ultimate151 = action.payload;
        state.isLoading = false;
        console.log("Loaded ultimate 151 pokemon from DB");
      })
      .addCase(initializeUltimate151.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        console.error("Failed to load ultimate 151 pokemon");
      })
  },
});

export const { addUltimate151, updateUltimate151, moveToNewUltimate151, moveToExistingUltimate151, removeUltimate151ByFavPokemon, clearUltimate151 } = ultimate151Slice.actions;

export const getUltimate151 = (state) => state.ultimate151.ultimate151;
export const getIsUltimate151Loading = (state) => state.ultimate151.isLoading;

export default ultimate151Slice.reducer;