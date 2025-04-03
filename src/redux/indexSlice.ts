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
  getallVendors: boolean;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  user: null,
  getallVendors: false,
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
    getAllVendors: (state,action) => {
      state.getallVendors = action.payload;
    },
  },
});

export const { initUser, logout,getAllVendors } = adminSlice.actions;
export default adminSlice.reducer;
