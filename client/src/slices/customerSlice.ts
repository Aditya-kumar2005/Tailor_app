import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../api';
import type { Customer } from '../types';
import type { RootState } from '../store';

interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
  pageSize: number;
}

const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null,
  search: '',
  page: 1,
  pageSize: 5,
};

const selectCustomersState = (state: RootState) => state.customers;

/* ---------------- THUNKS ---------------- */

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/customers');
      return res.data as Customer[];
    } catch {
      return rejectWithValue('Failed to fetch customers');
    }
  }
);

export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (data: Partial<Customer>) => {
    const res = await api.post('/customers', data);
    return res.data as Customer;
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, data }: { id: number; data: Partial<Customer> }) => {
    const res = await api.put(`/customers/${id}`, data);
    return res.data as Customer;
  }
);
export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id: number) => {
    await api.delete(`/customers/${id}`);
    return id;
  }
);



/* ---------------- SLICE ---------------- */

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch Customers */
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      })

      /* Create Customer */
      .addCase(createCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.list.unshift(action.payload);
      })

      /* Update Customer */
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        const i = state.list.findIndex(c => c.id === action.payload.id);
        if (i !== -1) state.list[i] = action.payload;
      })
      // In extraReducers:
      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});

export const { setSearch, setPage } = customerSlice.actions;
export default customerSlice.reducer;

/* ---------------- SELECTORS ---------------- */
export const selectVisibleCustomers = createSelector(
  [selectCustomersState],
  ({ list, search, page, pageSize }) => {
    const filtered = list.filter(
      c =>
        `${c.name} ${c.email} ${c.phone}`
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }
);

export const selectTotalPages = createSelector(
  [selectCustomersState],
  ({ list, search, pageSize }) => {
    const count = list.filter(
      c =>
        `${c.name} ${c.email} ${c.phone}`
          .toLowerCase()
          .includes(search.toLowerCase())
    ).length;

    return Math.ceil(count / pageSize);
  }
);
