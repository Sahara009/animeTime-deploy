import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecentAnime {
  id: number;
  code: string;
  episode: string;
  minute: number;
}

interface RecentAnimeState {
  recentAnimes: RecentAnime[];
}

const initialState: RecentAnimeState = {
  recentAnimes: JSON.parse(localStorage.getItem("recentAnimes") || "[]"),
};

const recentAnimeSlice = createSlice({
  name: "recentAnime",
  initialState,
  reducers: {
    addRecentAnime: (state, action: PayloadAction<RecentAnime>) => {
      const existingIndex = state.recentAnimes.findIndex(
        (anime) => anime.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.recentAnimes[existingIndex] = action.payload;
      } else {
        state.recentAnimes.push(action.payload);
      }
      localStorage.setItem("recentAnimes", JSON.stringify(state.recentAnimes));
    },
    clearRecentAnimes: (state) => {
      state.recentAnimes = [];
      localStorage.removeItem("recentAnimes");
    },
  },
});

export const { addRecentAnime, clearRecentAnimes } = recentAnimeSlice.actions;

export default recentAnimeSlice.reducer;
