import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSelectedTeamsPopup: { status: false, helperData: null },
  switchTeamsPopup: { status: false, helperData: null },
  otherTeamPreviewPopup: { status: false, helperData: null },
  paymentConfirmationPopup: { status: false, helperData: null },
  confirmPaymentPopup: { status: false, helperData: null },
  playerDetail: [],
  viewingPlayer: { slug: null, index: 0 },
  cricketMatchReminderPopup: { status: false, helperData: null },
};

const gamesSlice = createSlice({
  name: "games",
  initialState: initialState,
  reducers: {
    openUserSelectedTeamsPopup(state, action) {
      state.userSelectedTeamsPopup.helperData = action.payload;
      state.userSelectedTeamsPopup.status = true;
    },
    closeUserSelectedTeamsPopup(state, action) {
      state.userSelectedTeamsPopup.status = false;
      state.userSelectedTeamsPopup.helperData = null;
    },

    openSwitchTeamsPopup(state, action) {
      state.switchTeamsPopup.helperData = action.payload;
      state.switchTeamsPopup.status = true;
    },
    closeSwitchTeamsPopup(state, action) {
      state.switchTeamsPopup.status = false;
      state.switchTeamsPopup.helperData = null;
    },

    openOtherTeamPreviewPopup(state, action) {
      state.otherTeamPreviewPopup.helperData = action.payload;
      state.otherTeamPreviewPopup.status = true;
    },
    closeOtherTeamPreviewPopup(state, action) {
      state.otherTeamPreviewPopup.status = false;
      state.otherTeamPreviewPopup.helperData = null;
    },

    openPaymentConfirmationPopup(state, action) {
      state.paymentConfirmationPopup.helperData = action.payload;
      state.paymentConfirmationPopup.status = true;
    },
    closePaymentConfirmationPopup(state, action) {
      state.paymentConfirmationPopup.status = false;
      state.paymentConfirmationPopup.helperData = null;
    },

    setPlayerDetail(state, action) {
      state.playerDetail = action.payload;
    },

    openConfirmPaymentPopup(state, action) {
      state.confirmPaymentPopup.helperData = action.payload;
      state.confirmPaymentPopup.status = true;
    },
    closeConfirmPaymentPopup(state, action) {
      state.confirmPaymentPopup.status = false;
      state.confirmPaymentPopup.helperData = null;
    },

    setViewingPlayer(state, action) {
      state.viewingPlayer.slug = action.payload.slug;
      state.viewingPlayer.index = action.payload.index;
    },

    openCricketMatchReminderPopup(state, action) {
      state.cricketMatchReminderPopup.helperData = action.payload;
      state.cricketMatchReminderPopup.status = true;
    },
    closeCricketMatchReminderPopup(state, action) {
      state.cricketMatchReminderPopup.status = false;
      state.cricketMatchReminderPopup.helperData = null;
    },
  },
});

export const {
  openUserSelectedTeamsPopup,
  closeUserSelectedTeamsPopup,
  openSwitchTeamsPopup,
  closeSwitchTeamsPopup,
  openOtherTeamPreviewPopup,
  closeOtherTeamPreviewPopup,
  openPaymentConfirmationPopup,
  closePaymentConfirmationPopup,
  openConfirmPaymentPopup,
  closeConfirmPaymentPopup,
  setPlayerDetail,
  setViewingPlayer,
  openCricketMatchReminderPopup,
  closeCricketMatchReminderPopup,
} = gamesSlice.actions;
export default gamesSlice.reducer;
