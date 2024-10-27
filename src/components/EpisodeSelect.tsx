import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { List } from "../types/schedule.type";

interface EpisodeSelectProps {
  title: List | undefined;
  activeEpisode: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
}

export const EpisodeSelect: React.FC<EpisodeSelectProps> = ({
  title,
  activeEpisode,
  handleChange,
}) => (
  <FormControl style={{ marginTop: 20 }}>
    <Select
      value={activeEpisode}
      onChange={handleChange}
      className="customSelect"
    >
      {title?.player.list.map((episode) => (
        <MenuItem key={episode.episode} value={episode.episode}>
          <p style={{ color: "white" }}>Серия {episode.episode}</p>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
