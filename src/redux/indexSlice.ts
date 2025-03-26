import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateValue } from "./initialState";

interface User {
  id: string;
  full_name: string;
  email: string;
}

interface UserState {
  token: string | null;
  user: User | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  user: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { initUser, logout } = adminSlice.actions;
export default adminSlice.reducer;
