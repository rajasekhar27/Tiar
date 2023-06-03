import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import restApi from "./apis/restApi";
import authReducer from "./slices/auth";
import loginReducer from "./slices/login";
import walletReducer from "./slices/wallet";
import cricketReducer from "./slices/cricket";
import gamesReducer from "./slices/games";
import cryptoApi from "./apis/cryptoApi";
import whitelistReducer from "./slices/whitelist";
import uiReducer from "./slices/ui";
import profileReducer from "./slices/profile";
import supportReducer from "./slices/support";

const middlewares = [restApi.middleware, cryptoApi.middleware];

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    wallet: walletReducer,
    cricket: cricketReducer,
    games: gamesReducer,
    whitelist: whitelistReducer,
    profile: profileReducer,
    ui: uiReducer,
    support: supportReducer,
    [restApi.reducerPath]: restApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

export default store;
