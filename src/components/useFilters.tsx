// useFilters.ts
import { useEffect, useState } from "react";
import { getAnimeUpdates, searchFilterAnime } from "../api";
import { debounce } from "@mui/material";
import { List } from "../types/schedule.type";

export const useFilters = (
  searchTerm: string,
  genres: string,
  seasonCode: string,
  selectedTypes: number[],
  filtersApplied: boolean,
  pageNumber: number
) => {
  const [filterAnime, setFilterAnime] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUpdates = async () => {
    setLoading(true);
    const updates = await getAnimeUpdates(pageNumber);
    setFilterAnime(updates || []);
    setLoading(false);
  };

  const debouncedFilter = debounce(async () => {
    if (!genres && !seasonCode && selectedTypes.length === 0 && !searchTerm) {
      return;
    }

    setLoading(true);
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
    if (!filtersApplied) {
      loadUpdates();
    } else {
      debouncedFilter();
    }
  }, [
    pageNumber,
    filtersApplied,
    genres,
    seasonCode,
    selectedTypes,
    searchTerm,
  ]);

  return { filterAnime, loading };
};
