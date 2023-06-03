import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chooseNetworkPopup: {
    status: false,
    helperData: null,
  },
  withdrawPopup: {
    status: false,
    helperData: null,
  },
  network: "TIAR",
  QRScannerPopup: {
    status: false,
    helperData: null,
  },

  nftTransactionSuccessPopup: {
    status: false,
    helperData: null,
  },
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    openChooseNetworkPopup(state, action) {
      state.chooseNetworkPopup.helperData = action.payload;
      state.chooseNetworkPopup.status = true;
    },
    closeChooseNetworkPopup(state, action) {
      state.chooseNetworkPopup.status = false;
      state.chooseNetworkPopup.helperData = null;
    },

    openWithdrawPopup(state, action) {
      state.withdrawPopup.helperData = action.payload;
      state.withdrawPopup.status = true;
    },
    closeWithdrawPopup(state, action) {
      state.withdrawPopup.status = false;
      state.withdrawPopup.helperData = null;
    },

    setNetwork(state, action) {
      state.network = action.payload;
    },

    openQRScannerPopup(state, action) {
      state.QRScannerPopup.helperData = action.payload;
      state.QRScannerPopup.status = true;
    },
    closeQRScannerPopup(state, action) {
      state.QRScannerPopup.status = false;
      state.QRScannerPopup.helperData = null;
    },

    openNFTTransactionSuccessPopup(state, action) {
      state.nftTransactionSuccessPopup.helperData = action.payload;
      state.nftTransactionSuccessPopup.status = true;
    },
    closeNFTTransactionSuccessPopup(state, action) {
      state.nftTransactionSuccessPopup.status = false;
      state.nftTransactionSuccessPopup.helperData = null;
    },
  },
});

export const {
  openChooseNetworkPopup,
  closeChooseNetworkPopup,
  setNetwork,
  openWithdrawPopup,
  closeWithdrawPopup,
  openQRScannerPopup,
  closeQRScannerPopup,
  openNFTTransactionSuccessPopup,
  closeNFTTransactionSuccessPopup,
} = walletSlice.actions;
export default walletSlice.reducer;
