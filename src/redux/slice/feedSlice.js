import { createSlice } from "@reduxjs/toolkit";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { act } from "react";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((d) => d._id !== action.payload);
    },
  },
});

export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed } = feedSlice.actions;
