import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showLoader(state, action) {
      state.loader = true;
    },
    hideLoader(state, action) {
      state.loader = false;
    },
  },
});

export const { showLoader, hideLoader } = uiSlice.actions;
export default uiSlice.reducer;
