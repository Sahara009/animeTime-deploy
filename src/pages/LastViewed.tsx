import React, { useEffect, useRef, useState } from "react";
import { AnimeCard } from "../components";

export const LastViewed = () => {
  const [watchedAnime, setWatchedAnime] = useState([]);
  const animeListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedWatchedAnime = localStorage.getItem("watchedAnime");

    if (savedWatchedAnime) {
      try {
        const parsedAnime = JSON.parse(savedWatchedAnime);

        setWatchedAnime(parsedAnime);
      } catch (error) {
        console.error("Ошибка парсинга данных из localStorage:", error);
      }
    } else {
      console.warn("Нет данных в localStorage.");
    }
  }, []);

  const scrollToAnimeList = () => {
    if (animeListRef.current) {
      const offset = 90;
      const top =
        animeListRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="last-viewed container">
      <div className="welcome-message">
        <h1>Добро пожаловать!</h1>
        <p>У нас все самое лучшее и новинки аниме!</p>
        <button className="explore-button" onClick={scrollToAnimeList}>
          Смотреть все
        </button>
      </div>
      {watchedAnime.length > 0 ? (
        <>
          <h1 className="mainTitle">Последнее, что вы смотрели</h1>
          <div className="last-viewed-list" ref={animeListRef}>
            {watchedAnime.map((item, index) => (
              <div className="list_anime-item" key={index}>
                <AnimeCard item={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
