import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Staff {
  id: number;
  name: string;
  role: string;
}

interface StaffState {
  list: Staff[];
}

const initialState: StaffState = {
  list: [],
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<Staff[]>) => {
      state.list = action.payload;
    },
    addStaff: (state, action: PayloadAction<Staff>) => {
      state.list.push(action.payload);
    },
    updateStaff: (state, action: PayloadAction<Staff>) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteStaff: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(s => s.id !== action.payload);
    },
  },
});

export const { setStaff, addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;
