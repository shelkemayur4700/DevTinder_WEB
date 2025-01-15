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
    removeFeed: (state, action) => null,
  },
});

export default feedSlice.reducer;
export const { addFeed, removeFeed } = feedSlice.actions;
