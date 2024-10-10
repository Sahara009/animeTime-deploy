import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { List } from "../types/schedule.type";
import { AnimeCard } from "../components/AnimeCard";
import { removeFavorite } from "../store/slices/animeSlice";

interface Props {
  className?: string;
}

export const FavoritesPage: React.FC<Props> = () => {
  const favorites = useSelector((state: RootState) => state.anime.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="favorites-page">
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((anime: List) => (
            <div key={anime.id} style={{ maxWidth: 250 }}>
              <AnimeCard item={anime} className="favorite-card" />
              <button
                onClick={() => handleRemoveFavorite(anime.id)}
                className="remove-favorite-button"
              >
                Удалить из списка
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "gray" }}>Избранных аниме пока нет.</p>
      )}
    </div>
  );
};
