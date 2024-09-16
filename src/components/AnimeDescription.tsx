import React, { useState } from "react";
import { List } from "../types/schedule.type";

interface Props {
  className?: string;
  title?: List;
}

export const AnimeDescription: React.FC<Props> = ({ title }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  return (
    <div className="animeinfo">
      <img
        style={{ width: 300, borderRadius: 9 }}
        src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
        alt="error image"
      />
      <div className="animeinfo-description">
        <h2>{title?.names.ru}</h2>
        <h4>
          {title?.description
            ? showDescription
              ? title.description
              : title.description.slice(0, 200) + "..."
            : "Описание недоступно"}
        </h4>

        <button
          onClick={() => {
            setShowDescription(!showDescription);
          }}
        >
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
      </div>
    </div>
  );
};
