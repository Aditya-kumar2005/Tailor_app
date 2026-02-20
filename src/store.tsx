import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import inventoryReducer from "./slices/inventorySlice";
import customerReducer from "./slices/customerSlice";
import measurementReducer from "./slices/measurementSlice";
import paymentReducer from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
    inventory: inventoryReducer,
    customers: customerReducer,
    measurements:measurementReducer,
    payments:paymentReducer,
  },
});

// Infer types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;