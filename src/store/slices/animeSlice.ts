import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../../types/schedule.type";

const loadFavoritesFromLocalStorage = (): List[] => {
  try {
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Ошибка при загрузке избранного из localStorage", e);
    return [];
  }
};

const saveFavoritesToLocalStorage = (favorites: List[]) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem("favorites", serializedState);
  } catch (e) {
    console.warn("Ошибка при сохранении избранного в localStorage", e);
  }
};

export interface AnimeState {
  favorites: List[];
}

const initialState: AnimeState = {
  favorites: loadFavoritesFromLocalStorage(),
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<List>) {
      const isAlreadyFavorite = state.favorites.some(
        (anime) => anime.id === action.payload.id
      );
      if (!isAlreadyFavorite) {
        state.favorites.push(action.payload);
        saveFavoritesToLocalStorage(state.favorites);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (anime) => anime.id !== action.payload
      );
      saveFavoritesToLocalStorage(state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite } = animeSlice.actions;
export default animeSlice.reducer;
