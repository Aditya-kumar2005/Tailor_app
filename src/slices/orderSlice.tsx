import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: number;
  garment: string;
  status: string;
  deliveryDate: string;
}

interface OrderState {
  list: Order[];
}

const initialState: OrderState = {
  list: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.list = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.list.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.list.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(o => o.id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, updateOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;