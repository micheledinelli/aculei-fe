import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageReducer";

const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export default store;
