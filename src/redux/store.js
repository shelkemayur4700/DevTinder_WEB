import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slice/userSlice";
const store = configureStore({
  reducer: {
    user: useReducer,
  },
});

export default store;
