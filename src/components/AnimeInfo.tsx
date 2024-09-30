import React, { useEffect, useState } from "react";
import { getTitleInfo } from "../api";
import { useLocation, useParams } from "react-router-dom";
import { List } from "../types/schedule.type";
import ReactPlayer from "react-player";
import { AnimeDescription } from "./AnimeDescription";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AISkeleton } from "./AISkeleton";

interface Props {
  className?: string;
}

export const AnimeInfo: React.FC<Props> = () => {
  const { code } = useParams();
  const [title, setTitle] = useState<List>();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeEpisode, setActiveEpisode] = useState<string>("1");
  const location = useLocation();

  const createTitle = async () => {
    setLoading(true);
    if (code) {
      const data = await getTitleInfo(code);
      setTitle(data);
      setLoading(false);
    } else {
      setLoading(false);
      console.log("ошибка запроса");
    }
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    setActiveEpisode(event.target.value);
  };

  useEffect(() => {
    createTitle();
  }, [location]);

  return loading ? (
    <AISkeleton />
  ) : (
    <div className="animeInfo-wrapper container" style={{ paddingTop: 40 }}>
      <AnimeDescription title={title} />
      <FormControl style={{ marginTop: 20 }}>
        <InputLabel id="episode-select-label">Select Episode</InputLabel>
        <Select
          labelId="episode-select-label"
          value={activeEpisode}
          onChange={handleChange}
          label="Select Episode"
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
              <p>Episode {episode.episode}</p>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="player">
        {title?.player.list.map((ep) =>
          ep.episode === Number(activeEpisode) ? (
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
      <div className="hidden-desc">
        <h4>{title?.description}</h4>
      </div>
    </div>
  );
};
