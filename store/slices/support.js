const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  ticketDetailsPopup: { status: false, helperData: null },
};

const supportSlice = createSlice({
  name: "support",
  initialState: initialState,
  reducers: {
    openTicketDetailsPopup(state, action) {
      state.ticketDetailsPopup.helperData = action.payload;
      state.ticketDetailsPopup.status = true;
    },
    closeTicketDetailsPopup(state, action) {
      state.ticketDetailsPopup.status = false;
      state.ticketDetailsPopup.helperData = null;
    },
  },
});

export const { openTicketDetailsPopup, closeTicketDetailsPopup } =
  supportSlice.actions;
export default supportSlice.reducer;
