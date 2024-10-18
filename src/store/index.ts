import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import animeReducer from "./slices/animeSlice";
import recentAnimeSlice from "./slices/recentAnimeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    anime: animeReducer,
    recentAnime: recentAnimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
