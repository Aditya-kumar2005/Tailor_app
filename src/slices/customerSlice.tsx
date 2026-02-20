import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

interface CustomerState {
  list: Customer[];
}

const initialState: CustomerState = {
  list: [],
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.list = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.list.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.list.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    },
  },
});

export const { setCustomers, addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;