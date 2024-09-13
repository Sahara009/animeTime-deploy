import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { searchFilterAnime } from "../api";
import { ListArray } from "../types/schedule.type";
import GenreSelect from "./Genres";
import SeasonsSelect from "./Seasons";
import { RangeYear } from "./RangeYear";
import TypesSelect from "./Types";
import { AnimeCard } from "./AnimeCard";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = () => {
  const [filterAnime, setFilterAnime] = useState<ListArray | undefined>([]);

  // жанры
  const [selectedGenresString, setSelectedGenresString] = useState<string>("");
  const handleGenresChange = (genres: string) => {
    setSelectedGenresString(genres);
  };
  // сезоны
  const [selectedSeasons, setSelectedSeasons] = useState<string>("");
  const handleSeasonsChange = (seasons: string) => {
    setSelectedSeasons(seasons);
  };
  // типы
  const [selectedTypes, setSelectedTypes] = useState<string>("");

  const handleTypeChange = (type: string) => {
    setSelectedTypes(type);
  };
  // годы
  const [yearsString, setYearsString] = useState<string>(""); // Храним строку с годами
  const handleRangeChange = (yearsString: string) => {
    setYearsString(yearsString); // Обновляем строку с годами
  };

  // запрос
  const createFilter = async () => {
    const data = await searchFilterAnime(
      yearsString,
      selectedGenresString,
      selectedSeasons,
      selectedTypes
    );
    console.log(data);
    if (data) {
      setFilterAnime(data);
    } else {
      console.log("ошикба");
    }
  };
  useEffect(() => {
    createFilter();
  }, [yearsString, selectedGenresString, selectedSeasons, selectedTypes]);

  return (
    <div className="container filter-wrapper">
      <Box className="filters">
        <RangeYear onRangeChange={handleRangeChange} />
        <GenreSelect onGenresChange={handleGenresChange} />
        <SeasonsSelect onSeasonsChange={handleSeasonsChange} />
        <TypesSelect onTypeChange={handleTypeChange} />
      </Box>
      <div className="filter-anime">
        {filterAnime?.map((anime) => (
          <AnimeCard className="filter-anime_card" item={anime} />
        ))}
      </div>
    </div>
  );
};
