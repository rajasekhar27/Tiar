import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },

    clearEmail(state, action) {
      state.email = "";
    },
  },
});

export const { setEmail, clearEmail } = slice.actions;
export default slice.reducer;
