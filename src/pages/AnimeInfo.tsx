import React, { useEffect, useState, useCallback } from "react";
import { getTitleInfo } from "../api";
import { useParams } from "react-router-dom";
import { List } from "../types/schedule.type";
import { AISkeleton } from "../components/AISkeleton";
import { AnimeDescription } from "../components/AnimeDescription";
import Recommendations from "../components/Recomendations";
import EpisodePlayer from "../components/EpisodePlayer";
import { EpisodeSelect } from "../components/EpisodeSelect";
import { useAnimeProgress } from "../components/useAnimeProgress";
import { fetchRecommendations } from "../components/fetchRec";

interface Props {
  className?: string;
  toggleBackgroundDim: () => void;
  isBackgroundDimmed: boolean;
}

export const AnimeInfo: React.FC<Props> = ({
  toggleBackgroundDim,
  isBackgroundDimmed,
}) => {
  const { code } = useParams<{ code: string }>();
  const [title, setTitle] = useState<List | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<List[]>([]);

  const { activeEpisode, setActiveEpisode, savedTime } = useAnimeProgress(
    code!
  );

  // функция для работы с кэшем
  const loadFromCache = useCallback(() => {
    const cachedData = localStorage.getItem(`anime-${code}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setTitle(parsedData.title);
      setRecommendations(parsedData.recommendations);
      return true;
    }
    return false;
  }, [code]);

  // функция для рекомендаций (в процессе)
  const loadAnimeData = useCallback(async () => {
    if (code) {
      try {
        const [titleData, recommendedAnime] = await Promise.all([
          getTitleInfo(code),
          fetchRecommendations(title?.genres),
        ]);
        setTitle(titleData);
        setRecommendations(recommendedAnime?.slice(0, 10) || []);
        localStorage.setItem(
          `anime-${code}`,
          JSON.stringify({
            title: titleData,
            recommendations: recommendedAnime,
          })
        );
      } catch (error) {
        console.error("Ошибка при загрузке реков:", error);
      }
    }
  }, [code, title?.genres]);

  // функция загрузки данных
  const fetchData = useCallback(async () => {
    setLoading(true);
    const isCached = loadFromCache(); // данные из кэша
    if (!isCached) {
      await loadAnimeData(); // данных в кэше нет загружаем с сервера
    }
    setLoading(false);
  }, [loadFromCache, loadAnimeData]);

  useEffect(() => {
    fetchData();
  }, [code, fetchData]);

  return loading ? (
    <div className="animeInfo-wrapper container" style={{ paddingTop: 40 }}>
      <AISkeleton />
    </div>
  ) : (
    <>
      <div>
        <img
          className="backPost"
          src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
        />
      </div>
      <div className="animeInfo-wrapper container" style={{ paddingTop: 40 }}>
        <AnimeDescription title={title} />
        <EpisodeSelect
          title={title}
          activeEpisode={activeEpisode}
          handleChange={(e) => setActiveEpisode(e.target.value)}
        />
        <EpisodePlayer
          title={title}
          activeEpisode={activeEpisode}
          savedTime={savedTime}
          code={code!}
        />
        <button className="dimmed-button" onClick={toggleBackgroundDim}>
          {isBackgroundDimmed ? "Снять затемнение" : "Затемнить фон"}
        </button>
        <Recommendations recommendations={recommendations} />
      </div>
    </>
  );
};
