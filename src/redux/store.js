import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default store;
