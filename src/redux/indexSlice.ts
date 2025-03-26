import { createSlice } from "@reduxjs/toolkit";
import { initialStateValue } from "./initialState";

const initialState: initialStateValue = {
  users:{
  token: "",
  user: {
    id: "",
    email: "",
  }
}
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
   initUser(state, action) {
    state.users = action.payload;
   }
  },
});

export const {
  initUser
} = adminSlice.actions;

export default adminSlice.reducer;
