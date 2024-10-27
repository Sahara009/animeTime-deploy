import React from "react";
import { LastViewed } from "./LastViewed";
import { AnimeList } from "../components";
import { NewsList } from "../components/NewsList";

interface Props {
  className?: string;
}

export const Homepage: React.FC<Props> = () => {
  return (
    <>
      <div>
        <div className="container welcome-message">
          <h1>Добро пожаловать в мир аниме!</h1>
          <p>Лучшие сериалы и фильмы ждут вас!</p>
          <button
            className="explore-button"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Смотреть
          </button>
        </div>
        <LastViewed />
        <NewsList />
        <AnimeList />
      </div>
    </>
  );
};
