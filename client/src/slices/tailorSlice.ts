import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import type { Tailor } from '../types'; // Assuming a 'Tailor' type exists in 'types.ts'

// --- State Interface ---
interface TailorState {
  list: Tailor[];
  loading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: TailorState = {
  list: [],
  loading: false,
  error: null,
};

// --- Async Thunks ---

// Fetch all tailors
export const fetchTailors = createAsyncThunk('tailors/fetchTailors', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/measurements'); // 
    return response.data;
  } catch  {
    return rejectWithValue('Failed to fetch tailors');
  }
});

// --- Slice Definition ---
const tailorSlice = createSlice({
  name: 'tailors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch Tailors --- 
      .addCase(fetchTailors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTailors.fulfilled, (state, action: PayloadAction<Tailor[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTailors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// --- Export Reducer ---
export default tailorSlice.reducer;
