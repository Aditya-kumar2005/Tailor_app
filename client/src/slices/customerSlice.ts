import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import type { Customer } from '../types';

// --- State Interface ---
interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null,
};

// --- Async Thunks ---

// Fetch all customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/customers');
    return response.data;
  } catch (error:unknown) {
    return rejectWithValue( 'Failed to fetch customers'+error);
  }
});

// --- Slice Definition ---
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // Direct reducer to set customers (if needed, e.g., from a websocket)
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Customers --- 
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// --- Export Actions and Reducer ---
export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
