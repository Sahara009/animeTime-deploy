import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { List } from "../types/schedule.type";
import favorite from "../assets/favorite-svgrepo-com.svg";
import inFavorite from "../assets/favorite-svgrepo-com (1).svg";
import { addFavorite, removeFavorite } from "../store/slices/animeSlice";

interface Props {
  className?: string;
  title?: List;
}

export const AnimeDescription: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.anime.favorites);
  const user = useSelector((state: RootState) => state.user);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const isFavorite = favorites.some((anime) => anime.id === title?.id);

  const handleClick = () => {
    if (!user.token) {
      alert("Вам нужно войти в аккаунт, чтобы добавлять в избранное.");
      return;
    }

    if (isFavorite && title) {
      dispatch(removeFavorite(title.id));
    } else if (title) {
      dispatch(addFavorite(title));
    }
  };

  return (
    <div className="animeinfo">
      <img
        style={{ borderRadius: 9 }}
        src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
        alt="error image"
      />
      <div className="animeinfo-description">
        <h2>{title?.names.ru}</h2>
        <h5 style={{ color: "gray" }}>{title?.names.en}</h5>
        <h4>
          {title?.description
            ? showDescription
              ? title.description
              : title.description.slice(0, 200) + "..."
            : "Описание недоступно"}
        </h4>

        <button onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? "Скрыть" : "Показать все"}
        </button>
        <p>
          Статус: <span>{title?.status.string}</span>
        </p>
        <p>
          Жанры: <span>{title?.genres.join(", ")}</span>
        </p>
        <p>
          Год релиза:{" "}
          <span>
            {title?.season.string} {title?.season.year}
          </span>
        </p>
        <p>
          Тип: <span>{title?.type.full_string}</span>
        </p>

        {isFavorite ? (
          <img
            style={{ cursor: "pointer", width: 40, height: 50 }}
            src={inFavorite}
            alt="In Favorite"
            onClick={handleClick}
            className="favorite-button"
          />
        ) : (
          <img
            style={{ cursor: "pointer", width: 40, height: 50 }}
            src={favorite}
            alt="Favorite"
            onClick={handleClick}
            className="favorite-button"
          />
        )}
      </div>
    </div>
  );
};
