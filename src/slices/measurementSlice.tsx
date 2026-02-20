import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Measurement {
  id: number;
  customerId: number;
  garment: string;
  chest: number;
  waist: number;
  notes?: string;
}

interface MeasurementState {
  list: Measurement[];
}

const initialState: MeasurementState = {
  list: [],
};

const measurementSlice = createSlice({
  name: "measurements",
  initialState,
  reducers: {
    setMeasurements: (state, action: PayloadAction<Measurement[]>) => {
      state.list = action.payload;
    },
    addMeasurement: (state, action: PayloadAction<Measurement>) => {
      state.list.push(action.payload);
    },
    updateMeasurement: (state, action: PayloadAction<Measurement>) => {
      const index = state.list.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteMeasurement: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(m => m.id !== action.payload);
    },
  },
});

export const { setMeasurements, addMeasurement, updateMeasurement, deleteMeasurement } = measurementSlice.actions;
export default measurementSlice.reducer;