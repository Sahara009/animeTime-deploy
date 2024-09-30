import React, { useEffect, useState } from "react";
import { Box, TextField, debounce } from "@mui/material";
import { getAnimeUpdates, searchFilterAnime } from "../api";
import { List } from "../types/schedule.type";
import GenreSelect from "./Genres";
import SeasonsSelect from "./Seasons";
import TypesSelect from "./Types";
import { AnimeCard } from "./AnimeCard";
import { useLocation } from "react-router-dom"; // Импортируйте useLocation

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = () => {
  const [filterAnime, setFilterAnime] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string>("");
  const [seasonCode, setSeasonCode] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Состояние для текстового фильтра
  const pageNumber = 1;
  const [filtersApplied, setFiltersApplied] = useState(false);

  const location = useLocation(); // Используйте useLocation

  const loadUpdates = async () => {
    setLoading(true);
    const updates = await getAnimeUpdates(pageNumber);
    setFilterAnime(updates || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!filtersApplied) {
      loadUpdates();
    }
  }, [pageNumber, filtersApplied]);

  // Извлечение searchTerm из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get("searchTerm");
    if (term) {
      setSearchTerm(term);
    }
  }, [location]);

  const debouncedFilter = debounce(async () => {
    if (!genres && !seasonCode && selectedTypes.length === 0 && !searchTerm) {
      return;
    }

    setLoading(true);
    console.log("Searching with:", {
      genres,
      seasonCode,
      selectedTypes,
      searchTerm,
    });

    const filteredAnime = await searchFilterAnime(
      searchTerm,
      genres,
      seasonCode,
      selectedTypes.join(",")
    );

    console.log("Filtered Anime:", filteredAnime);

    setFilterAnime(filteredAnime || []);
    setLoading(false);
  }, 300);

  useEffect(() => {
    if (genres || seasonCode || selectedTypes.length > 0 || searchTerm) {
      setFiltersApplied(true);
      debouncedFilter();
    }
  }, [genres, seasonCode, selectedTypes, searchTerm]); // Добавляем searchTerm в зависимости

  const handleGenresChangeLocal = (selectedGenres: string) => {
    setGenres(selectedGenres);
  };

  const handleSeasonsChange = (selectedSeason: string) => {
    setSeasonCode(selectedSeason);
  };

  const handleTypeChange = (types: number[]) => {
    setSelectedTypes(types);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
  };

  return (
    <div className="container filter-wrapper">
      <Box className="filters">
        <TextField
          label="Поиск по названию"
          variant="outlined"
          value={searchTerm} // Устанавливаем значение из состояния
          onChange={handleSearchChange} // Обработчик изменений для текстового фильтра
          fullWidth
        />
        <GenreSelect onGenresChange={handleGenresChangeLocal} />
        <SeasonsSelect onSeasonsChange={handleSeasonsChange} />
        <TypesSelect onTypeChange={handleTypeChange} />
      </Box>
      <div className="filter-anime">
        {loading ? (
          <h1>Загрузка...</h1>
        ) : (
          filterAnime?.map((anime) => (
            <AnimeCard
              key={anime.code}
              className="filter-anime_card"
              item={anime}
            />
          ))
        )}
      </div>
    </div>
  );
};
