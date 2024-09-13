import React, { useEffect, useState } from "react";
import { ListArray } from "../types/schedule.type";
import { searchAnime } from "../api";
import { Link } from "react-router-dom";
import { debounce } from "@mui/material"; // Добавляем debounce из MUI

interface Props {
  className?: string;
}

export const Input: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState<ListArray | undefined>([]);

  // Создаем функцию с debounce
  const debouncedSearch = debounce(async (term: string) => {
    if (term) {
      const data = await searchAnime(term);
      setAnimeList(data);
    } else {
      setAnimeList([]);
    }
  }, 3000); // 3000 миллисекунд = 3 секунды

  useEffect(() => {
    debouncedSearch(searchTerm);
    // Отменяем предыдущий debounce при смене значения
    return () => debouncedSearch.clear();
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="input_wrapper" style={{ position: "relative" }}>
      <input
        type="text"
        className="input-anime"
        placeholder="Найти аниме"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {searchTerm && ( // Добавляем условие для отображения списка
        <div
          className="popover"
          style={{ position: "absolute", top: "100%", left: 0, zIndex: 1 }}
        >
          <ul className="search_items">
            {animeList?.slice(0, 3).map((anime) => (
              <Link to={`/serials/${anime.code}`} key={anime.id}>
                <div className="search_item">
                  <img
                    src={`https://static-libria.weekstorm.one${anime?.posters.original.url}`}
                    alt=""
                  />
                  <div className="search_item-info">
                    <h4>{anime.names.ru}</h4>
                    <div className="search_genres">
                      {anime.genres.map((genr, index) => (
                        <li key={index}>{genr}</li>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
