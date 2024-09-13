import React, { useEffect, useState } from "react";
import { getTitleInfo } from "../api";
import { useParams } from "react-router-dom";
import { List } from "../types/schedule.type";
import ReactPlayer from "react-player";

interface Props {
  className?: string;
}

export const AnimeInfo: React.FC<Props> = () => {
  const { code } = useParams();
  const [title, setTitle] = useState<List>();
  const [error, setError] = useState<string | null>(null);
  const [activeEpisode, setActiveEpisode] = useState<string>("1"); // eslint-disable-line @typescript-eslint/no-unused-vars
  console.log("консоль ошикбки:", error);

  const createTitle = async () => {
    if (code) {
      const data = await getTitleInfo(code);
      console.log(data);
      setTitle(data);
    } else {
      setError("Не удалось загрузить расписание");
    }
  };

  useEffect(() => {
    createTitle();
  }, []);

  if (!title) {
    return <h2>soon</h2>;
  }

  console.log(activeEpisode);

  return (
    <div className="animeInfo-wrapper container" style={{ paddingTop: 40 }}>
      <div className="animeinfo">
        <img
          style={{ width: 300, borderRadius: 9 }}
          src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
          alt="gdfgdfg"
        />
        <div className="animeinfo-description">
          <h2>{title?.names.en}</h2>
          <p>{title.description}</p>
        </div>
      </div>
      <select
        value={activeEpisode}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setActiveEpisode(e.target.value);
        }}
        className="select"
      >
        {title?.player.list.map((episode) => (
          <option key={episode.episode} value={episode.episode}>
            Episode {episode.episode}
          </option>
        ))}
      </select>
      <div className="player">
        {title.player.list.map((ep) =>
          ep.episode == Number(activeEpisode) ? (
            <ReactPlayer
              key={ep.uuid}
              width="100%"
              height="100%"
              controls
              url={`https://cache.libria.fun${ep.hls.hd}`}
            />
          ) : null
        )}
      </div>
    </div>
  );
};
