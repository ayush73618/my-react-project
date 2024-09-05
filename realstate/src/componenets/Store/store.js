import { configureStore } from "@reduxjs/toolkit";
import { loginSliceReducer } from "./login";
import { productSliceReducer } from "./product";

const store = configureStore({
  reducer: {
    loginReducer: loginSliceReducer,
    productReducer: productSliceReducer,
  },
});

export default store;
