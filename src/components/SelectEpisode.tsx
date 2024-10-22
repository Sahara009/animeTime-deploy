import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  episodes: { episode: string }[];
  activeEpisode: string;
  setActiveEpisode: (episode: string) => void;
}

const SelectEpisode: React.FC<Props> = ({
  episodes,
  activeEpisode,
  setActiveEpisode,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setActiveEpisode(event.target.value);
  };

  return (
    <FormControl style={{ marginTop: 20 }}>
      <Select value={activeEpisode} onChange={handleChange}>
        {episodes.map((episode) => (
          // Преобразуем episode в строку
          <MenuItem key={episode.episode} value={episode.episode.toString()}>
            <p>Серия {episode.episode}</p>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectEpisode;
