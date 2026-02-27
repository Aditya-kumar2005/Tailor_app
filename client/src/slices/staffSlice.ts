import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import type { Staff } from '../types';

interface StaffState {
  list: Staff[];
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchStaff = createAsyncThunk('staff/fetchStaff', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/staff');
    return response.data;
  } catch{
    return rejectWithValue('Failed to fetch staff');
  }
});

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action: PayloadAction<Staff[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default staffSlice.reducer;
