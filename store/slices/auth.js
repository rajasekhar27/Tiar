import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refreshToken: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    removeTokens(state, action) {
      // localStorage.clear();
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
    },

    addUserData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { addTokens, addUserData, removeTokens } = authSlice.actions;
export default authSlice.reducer;
