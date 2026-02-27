import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import type { Payment } from '../types';

interface PaymentState {
  list: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPayments = createAsyncThunk('payments/fetchPayments', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/payments');
    return response.data;
  } catch {
    return rejectWithValue('Failed to fetch payments');
  }
});

// export const fetchPayments = createAsyncThunk<
//   { payments: Payment[] },
//   void,
//   { rejectValue: string }
// >('payments/fetchPayments', async (_, { rejectWithValue }) => {
//   try {
//     const response = await api.get('/payments');
//     return response.data;
//   } catch (error: unknown) {
//     return rejectWithValue( 'Failed to fetch payments'+error);
//   }
// });

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.list = action.payload;
        state.loading = false;
        })
      // .addCase(fetchPayments.fulfilled, (state, action) => {
      //     state.payments = Array.isArray(action.payload)
      //       ? action.payload
      //     : action.payload?.payments ?? [];
      //     state.loading = false;
      //   })
        .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
