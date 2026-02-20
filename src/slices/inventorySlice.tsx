import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InventoryItem {
  id: number;
  name: string;
  type: string;
  stock: number;
}

interface InventoryState {
  items: InventoryItem[];
}

const initialState: InventoryState = {
  items: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<InventoryItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { setInventory, addItem, updateItem, deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;