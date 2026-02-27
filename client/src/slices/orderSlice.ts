import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import type {PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import type { Order, OrderItem } from '../types';

interface OrderState {
  list: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch {
    return rejectWithValue( 'Failed to fetch orders');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
      const rawOrders = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.orders ?? [];

        state.list = rawOrders.map((o: Order) => ({
        ...o,
        totalAmount: Number(o.totalAmount) || 0,
          items: Array.isArray(o.items)
          ? o.items.map((i: OrderItem) => ({
          ...i,
          quantity: Number(i.quantity) || 0,
          price: Number(i.price) || 0,
        }))
        : [],
        }));

        state.loading = false;
        })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
