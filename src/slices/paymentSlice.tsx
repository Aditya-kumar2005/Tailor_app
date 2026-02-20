import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: "Paid" | "Pending" | "Partial";
  method: "Cash" | "Card" | "Digital";
  date: string;
}

interface PaymentState {
  list: Payment[];
}

const initialState: PaymentState = {
  list: [],
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.list = action.payload;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.list.push(action.payload);
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deletePayment: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(p => p.id !== action.payload);
    },
  },
});

export const { setPayments, addPayment, updatePayment, deletePayment } = paymentSlice.actions;
export default paymentSlice.reducer;