import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  whitelistConfirmationPopup: { status: false, helperData: null },
  whitelistGreetingPopup: { status: false, helperData: null },
};

const whitelistSlice = createSlice({
  name: "whitelist",
  initialState: initialState,
  reducers: {
    openWhitelistConfirmationPopup(state, action) {
      state.whitelistConfirmationPopup.helperData = action.payload;
      state.whitelistConfirmationPopup.status = true;
    },
    closeWhitelistConfirmationPopup(state, action) {
      state.whitelistConfirmationPopup.status = false;
      state.whitelistConfirmationPopup.helperData = null;
    },

    openWhitelistGreetingPopup(state, action) {
      state.whitelistGreetingPopup.helperData = action.payload;
      state.whitelistGreetingPopup.status = true;
    },
    closeWhitelistGreetingPopup(state, action) {
      state.whitelistGreetingPopup.status = false;
      state.whitelistGreetingPopup.helperData = null;
    },
  },
});

export const {
  openWhitelistConfirmationPopup,
  closeWhitelistConfirmationPopup,
  openWhitelistGreetingPopup,
  closeWhitelistGreetingPopup,
} = whitelistSlice.actions;
export default whitelistSlice.reducer;
