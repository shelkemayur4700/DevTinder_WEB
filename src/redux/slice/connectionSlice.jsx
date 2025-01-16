import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
  },
});

export const { addConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
