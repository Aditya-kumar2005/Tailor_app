import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import customerReducer from './slices/customerSlice';
import tailorReducer from './slices/tailorSlice';
import staffReducer from './slices/staffSlice';
import orderReducer from './slices/orderSlice';
import inventoryReducer from './slices/inventorySlice';
import paymentReducer from './slices/paymentSlice';


// --- Store Configuration ---
// The single source of truth for the application state.

export const store = configureStore({
  reducer: {
    user: userReducer,
    customers: customerReducer,
    tailors: tailorReducer,
    staff: staffReducer,
    orders: orderReducer,
    inventory: inventoryReducer,
    payments: paymentReducer,
    // ... add other reducers here as the app grows
  },
  // Middleware is automatically included by configureStore, including redux-thunk
});

// --- Type Definitions ---
// These types are essential for type-safe access to the Redux store.

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;
