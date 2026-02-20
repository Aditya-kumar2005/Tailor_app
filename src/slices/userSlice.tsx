import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  email: string;
  role: "Admin" | "Staff" | "Customer";
}

interface UserState {
  loggedIn: boolean;
  profile: UserProfile | null;
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
  return { loggedIn: false, profile: null };
}

const initialState: UserState = loadInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserProfile>) => {
      state.loggedIn = true;
      state.profile = action.payload;
      // persist
      try {
        localStorage.setItem("userState", JSON.stringify(state));
      } catch {
        // ignore storage failures (e.g. quota exceeded or SSR)
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.profile = null;
      try {
        localStorage.removeItem("userState");
      } catch {
        // ignore failures
      }
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;