import React, { useEffect, useRef, useState } from "react";
import { getTitleInfo, searchFilterAnime } from "../api";
import { useLocation, useParams } from "react-router-dom";
import { List } from "../types/schedule.type";
import ReactPlayer from "react-player";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AISkeleton } from "../components/AISkeleton";
import { AnimeDescription } from "../components/AnimeDescription";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { AnimeCard } from "../components";
import { saveEpisode } from "../store/slices/animeSlice";
import { useDispatch } from "react-redux";

interface Props {
  className?: string;
  toggleBackgroundDim: () => void;
  isBackgroundDimmed: boolean;
}

export const AnimeInfo: React.FC<Props> = ({
  toggleBackgroundDim,
  isBackgroundDimmed,
}) => {
  const { code } = useParams();
  const [title, setTitle] = useState<List>();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeEpisode, setActiveEpisode] = useState<string>("1");
  const [recommendations, setRecommendations] = useState<List[]>([]);
  const playerRef = useRef<ReactPlayer>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const [savedTime, setSavedTime] = useState<number>(0);

  useEffect(() => {
    createTitle();
    window.scrollTo(0, 0);
  }, [location]);

  const createTitle = async () => {
    setLoading(true);
    const cachedData = localStorage.getItem(`anime-${code}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setTitle(parsedData.title);
      setRecommendations(parsedData.recommendations);
      setLoading(false);
    } else {
      if (code) {
        try {
          const [titleData, recommendedAnime] = await Promise.all([
            getTitleInfo(code),
            fetchRecommendations(),
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
          console.error("Ошибка при загрузке данных:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log("Ошибка запроса");
      }
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setActiveEpisode(event.target.value);
  };

  const fetchRecommendations = async () => {
    if (title?.genres) {
      const recommendedAnime = await searchFilterAnime(
        "",
        title.genres.join(","),
        "",
        ""
      );
      return recommendedAnime;
    }
    return [];
  };

  useEffect(() => {
    const savedData = localStorage.getItem(code!);
    if (savedData) {
      const { episode, time } = JSON.parse(savedData);
      setActiveEpisode(episode);
      setSavedTime(time);
    }
  }, [code]);

  const handlePlayerReady = () => {
    if (playerRef.current && savedTime > 0) {
      playerRef.current.seekTo(savedTime, "seconds");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = playerRef.current?.getCurrentTime() || 0;

      if (title) {
        const storedData = JSON.parse(
          localStorage.getItem("watchedAnime") || "[]"
        );

        const existingAnimeIndex = storedData.findIndex(
          (item: List) => item.code === code
        );

        if (existingAnimeIndex >= 0) {
          storedData[existingAnimeIndex] = {
            ...storedData[existingAnimeIndex],
            episode: activeEpisode,
            time: currentTime,
          };
        } else {
          storedData.push({
            code,
            episode: activeEpisode,
            time: currentTime,
            animeData: title,
          });
        }

        localStorage.setItem("watchedAnime", JSON.stringify(storedData));

        dispatch(
          saveEpisode({
            code,
            episode: activeEpisode,
            time: currentTime,
            animeData: title,
          })
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeEpisode, title]);

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
        <FormControl style={{ marginTop: 20 }}>
          <Select
            labelId="episode-select-label"
            value={activeEpisode}
            onChange={handleChange}
            className="customSelect"
            MenuProps={{
              PaperProps: {
                className: "customMenuItem",
              },
            }}
          >
            {title?.player.list.map((episode) => (
              <MenuItem
                key={episode.episode}
                value={episode.episode}
                className="customMenuItem"
              >
                <p>Серия {episode.episode}</p>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="player">
          {title?.player.list.map((ep) =>
            ep.episode === Number(activeEpisode) ? (
              <ReactPlayer
                ref={playerRef}
                key={ep.uuid}
                width="100%"
                height="100%"
                controls
                url={`https://cache.libria.fun${ep.hls.hd}`}
                onReady={handlePlayerReady}
                onProgress={({ playedSeconds }) => {
                  dispatch(
                    saveEpisode({
                      code,
                      episode: activeEpisode,
                      time: playedSeconds,
                    })
                  );
                  localStorage.setItem(
                    code!,
                    JSON.stringify({
                      episode: activeEpisode,
                      time: playedSeconds,
                    })
                  );
                }}
              />
            ) : null
          )}
        </div>
        <button className="dimmed-button" onClick={toggleBackgroundDim}>
          {isBackgroundDimmed ? "Снять затемнение" : "Затемнить фон"}
        </button>

        <div className="hidden-desc">
          <h4>{title?.description}</h4>
        </div>

        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: 20 }}>Похожее</h2>
          <Swiper spaceBetween={15} slidesPerView={4}>
            {recommendations.map((anime) => (
              <SwiperSlide key={anime.code}>
                <AnimeCard item={anime} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
