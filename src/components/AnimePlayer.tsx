import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { saveEpisode } from "../store/slices/animeSlice";
import { List } from "../types/schedule.type";

interface Props {
  code: string;
  title: List | undefined;
  activeEpisode: string;
  dispatch: ReturnType<typeof useDispatch>;
}

const AnimePlayer: React.FC<Props> = ({
  code,
  title,
  activeEpisode,
  dispatch,
}) => {
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = playerRef.current?.getCurrentTime() || 0;
      if (title) {
        dispatch(
          saveEpisode({
            code,
            episode: activeEpisode,
            time: currentTime,
            animeData: title,
          })
        );
        localStorage.setItem(
          code,
          JSON.stringify({ episode: activeEpisode, time: currentTime })
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeEpisode, title]);

  return (
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
          />
        ) : null
      )}
    </div>
  );
};

export default AnimePlayer;
