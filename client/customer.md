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
//
export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data: Partial<Customer>) => {
    const res = await api.post("/customers", data);
    return res.data;
  }
);
// update customers
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }: { id: number; data: Partial<Customer> }) => {
    const res = await api.put(`/customers/${id}`, data);
    return res.data;
  }
);

// Fetch all customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/customers');
    return response.data;
  } catch  {
    return rejectWithValue( 'Failed to fetch customers');
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
      })//update 
      ;
  },
});

// --- Export Actions and Reducer ---
export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

/* ---------------- THUNKS ---------------- */

export const fetchCustomers = createAsyncThunk(
  'customers/fetch',
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
  'customers/create',
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

export const softDeleteCustomer = createAsyncThunk(
  'customers/softDelete',
  async (id: number) => {
    await api.patch(`/customers/${id}/delete`);
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
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createCustomer.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        const i = state.list.findIndex(c => c.id === action.payload.id);
        if (i !== -1) state.list[i] = action.payload;
      })

      .addCase(softDeleteCustomer.fulfilled, (state, action) => {
        const customer = state.list.find(c => c.id === action.payload);
        if (customer) customer.isDeleted = true;
      });
  },
});

export const { setSearch, setPage } = customerSlice.actions;
export default customerSlice.reducer;

/* ---------------- SELECTORS ---------------- */

export const selectVisibleCustomers = (state: RootState) => {
  const { list, search, page, pageSize } = state.customers;

  const filtered = list.filter(
    c =>
      !c.isDeleted &&
      `${c.name} ${c.email} ${c.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const start = (page - 1) * pageSize;
  return filtered.slice(start, start + pageSize);
};

export const selectTotalPages = (state: RootState) => {
  const { list, search, pageSize } = state.customers;
  const count = list.filter(
    c =>
      !c.isDeleted &&
      `${c.name} ${c.email} ${c.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
  ).length;

  return Math.ceil(count / pageSize);
};
