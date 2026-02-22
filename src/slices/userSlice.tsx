import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  email: string;
  role: "Admin" | "Staff" | "Customer";
}

interface UserState {
  loggedIn: boolean;
  profile: UserProfile | null;
  token: string | null;
}

// try to restore user from localStorage so login survives reloads
function loadInitialState(): UserState {
  try {
    const json = localStorage.getItem("userState");
    if (json) {
      return JSON.parse(json);
    }
  } catch {
    // ignore parse errors
  }
  return { loggedIn: false, profile: null, token: null };
}

const initialState: UserState = loadInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{profile: UserProfile; token: string}>) => {
      state.loggedIn = true;
      state.profile = action.payload.profile;
      state.token = action.payload.token;
      // persist
      try {
        localStorage.setItem("userState", JSON.stringify(state));
        localStorage.setItem("token", action.payload.token);
      } catch {
        // ignore storage failures
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.profile = null;
      state.token = null;
      try {
        localStorage.removeItem("userState");
        localStorage.removeItem("token");
      } catch {
        // ignore failures
      }
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;