import React, { useEffect, useState } from "react";
import { Box, TextField, debounce } from "@mui/material";
import { getAnimeUpdates, searchFilterAnime } from "../api";
import { List } from "../types/schedule.type";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import GenreSelect from "../components/Genres";
import SeasonsSelect from "../components/Seasons";
import TypesSelect from "../components/Types";
import { AnimeCard } from "../components";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = () => {
  const [filterAnime, setFilterAnime] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string>("");
  const [seasonCode, setSeasonCode] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const pageNumber = 1;
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();

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
    setHasSearched(true);

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

    setFilterAnime(filteredAnime || []);
    setLoading(false);
  }, 300);

  useEffect(() => {
    if (genres || seasonCode || selectedTypes.length > 0 || searchTerm) {
      setFiltersApplied(true);
      debouncedFilter();
    }
  }, [genres, seasonCode, selectedTypes, searchTerm]);

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
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          className="filters-input"
        />
        <GenreSelect onGenresChange={handleGenresChangeLocal} />
        <SeasonsSelect onSeasonsChange={handleSeasonsChange} />
        <TypesSelect onTypeChange={handleTypeChange} />
        <h4>
          фильтрация по годам
          <br /> в разработке!
        </h4>
      </Box>
      <div className="filter-anime">
        {loading ? (
          <div className="filters-list-skeleton">
            <Skeleton
              baseColor="#363737"
              className="skeleton-list"
              count={15}
            />
          </div>
        ) : hasSearched && filterAnime.length === 0 ? (
          <h1>Ничего не найдено :(</h1>
        ) : (
          filterAnime.map((anime) => (
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
