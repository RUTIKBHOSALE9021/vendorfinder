
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  full_name: string;
  email: string;
}

interface VendorState {
  user: User | null;
}

const initialState: VendorState = {
  user: null,
};

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
  },
});

export const { setUser, clearUser, login } = vendorSlice.actions;

export default vendorSlice.reducer;
