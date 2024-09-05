import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    save(state, action) {
      console.log(action.payload);
      console.log(state.wishlist);
      state.wishlist = [...state.wishlist, action.payload];
      console.log(state.wishlist);
    },
    remove() {},
  },
});

export const productSliceReducer = productSlice.reducer;
export const productActions = productSlice.actions;
