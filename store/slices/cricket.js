import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  currentScreen: 3,

  currentPlayersType: 1,

  credits: 100,

  captain: null,
  viceCaptain: null,

  extraSpots: 7, // 3
  players: {
    wicketKeepers: [],
    batsmen: [],
    allRounders: [],
    bowlers: [],
  },

  playerInfoSlugs: {
    matchSlug: null,
    playerSlug: null,
  },
};

const cricketSlice = createSlice({
  initialState: initialState,
  name: "teamSelection",

  reducers: {
    setCurrentScreen(state, action) {
      state.currentScreen = action.payload;
    },

    setCurrentPlayersType(state, action) {
      state.currentPlayersType = action.payload;
    },

    addWicketKeeper(state, action) {
      state.players.wicketKeepers = [
        ...state.players.wicketKeepers,
        action.payload,
      ];
    },

    removeWicketKeeper(state, action) {
      state.players.wicketKeepers = state.players.wicketKeepers.filter(
        (w) => w.id !== action.payload
      );
    },

    addBowler(state, action) {
      state.players.bowlers = [...state.players.bowlers, action.payload];
    },

    removeBowler(state, action) {
      state.players.bowlers = state.players.bowlers.filter(
        (b) => b.id !== action.payload
      );
    },

    addBatsman(state, action) {
      state.players.batsmen = [...state.players.batsmen, action.payload];
    },

    removeBatsman(state, action) {
      state.players.batsmen = state.players.batsmen.filter(
        (b) => b.id !== action.payload
      );
    },

    addAllRounder(state, action) {
      state.players.allRounders = [
        ...state.players.allRounders,
        action.payload,
      ];
    },

    removeAllRounder(state, action) {
      state.players.allRounders = state.players.allRounders.filter(
        (a) => a.id !== action.payload
      );
    },

    setCaptain(state, action) {
      state.captain = action.payload;
    },

    setViceCaptain(state, action) {
      state.viceCaptain = action.payload;
    },

    setCredits(state, action) {
      state.credits = action.payload;
    },

    setExtraSpots(state, action) {
      state.extraSpots = action.payload;
    },

    reset(state, action) {
      state.currentScreen = 3;
      state.currentPlayersType = 1;
      state.credits = 100;
      state.captain = null;
      state.viceCaptain = null;
      state.players.wicketKeepers = [];
      state.players.batsmen = [];
      state.players.allRounders = [];
      state.players.bowlers = [];
      state.extraSpots = 7; // 3
    },

    setTeam(state, action) {
      state.captain = action.payload.captain;
      state.viceCaptain = action.payload.viceCaptain;
      state.players.allRounders = action.payload.allRounders;
      state.players.batsmen = action.payload.batsmen;
      state.players.bowlers = action.payload.bowlers;
      state.players.wicketKeepers = action.payload.wicketKeepers;
      state.extraSpots = 0;
      state.credits = action.payload.credits;
    },

    setPlayerInfoSlugs(state, action) {
      state.playerInfoSlugs.matchSlug = action.payload.matchSlug;
      state.playerInfoSlugs.playerSlug = action.payload.playerSlug;
      state.currentScreen = 6;
    },
  },
});

export const {
  setCurrentScreen,
  setCurrentPlayersType,
  addWicketKeeper,
  removeWicketKeeper,
  addAllRounder,
  removeAllRounder,
  addBatsman,
  removeBatsman,
  addBowler,
  removeBowler,
  setCaptain,
  setViceCaptain,
  setCredits,
  setExtraSpots,
  reset,
  setTeam,
  setPlayerInfoSlugs,
} = cricketSlice.actions;
export default cricketSlice.reducer;
