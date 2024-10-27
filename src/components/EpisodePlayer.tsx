import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { saveEpisode } from "../store/slices/animeSlice";
import { List } from "../types/schedule.type";

interface EpisodePlayerProps {
  title: List | undefined;
  activeEpisode: string;
  savedTime: number;
  code: string;
}

const EpisodePlayer: React.FC<EpisodePlayerProps> = ({
  title,
  activeEpisode,
  savedTime,
  code,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const dispatch = useDispatch();

  const handlePlayerReady = () => {
    if (playerRef.current && savedTime > 0) {
      playerRef.current.seekTo(savedTime, "seconds");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = playerRef.current?.getCurrentTime() || 0;
      dispatch(
        saveEpisode({
          code,
          episode: activeEpisode,
          time: currentTime,
          animeData: title,
        })
      );
      localStorage.setItem(
        code!,
        JSON.stringify({ episode: activeEpisode, time: currentTime })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [activeEpisode, code, dispatch, savedTime, title]);

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
  );
};

export default EpisodePlayer;
