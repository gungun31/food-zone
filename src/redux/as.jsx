import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;