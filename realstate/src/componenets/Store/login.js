import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoggedIn: localStorage.getItem("isActive") ? true : false,
};

const loginSlice = createSlice({
  name: "loginandSignUp",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedUser = action.payload;
      localStorage.setItem("user", JSON.stringify(state.loggedUser));
      localStorage.setItem("isActive", true);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("isActive");
      localStorage.removeItem("user");
    },
  },
});

export const loginSliceReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;
