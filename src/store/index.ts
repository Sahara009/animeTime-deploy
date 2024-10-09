import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import animeReducer from "./slices/animeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    anime: animeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
