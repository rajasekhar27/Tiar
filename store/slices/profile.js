import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchFriendPopup: { status: false, helperData: null },
  chatUsersPopup: { status: false, helperData: null },
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    openSearchFriendPopup(state, action) {
      state.searchFriendPopup.helperData = action.payload;
      state.searchFriendPopup.status = true;
    },
    closeSearchFriendPopup(state, action) {
      state.searchFriendPopup.status = false;
      state.searchFriendPopup.helperData = null;
    },

    openChatUsersPopup(state, action) {
      state.chatUsersPopup.helperData = action.payload;
      state.chatUsersPopup.status = true;
    },
    closeChatUsersPopup(state, action) {
      state.chatUsersPopup.status = false;
      state.chatUsersPopup.helperData = null;
    },
  },
});

export const {
  openSearchFriendPopup,
  closeSearchFriendPopup,
  openChatUsersPopup,
  closeChatUsersPopup,
} = profileSlice.actions;
export default profileSlice.reducer;
