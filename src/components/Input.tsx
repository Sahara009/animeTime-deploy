import React, { useEffect, useState } from "react";
import { ListArray } from "../types/schedule.type";
import { searchAnime } from "../api";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Импортируйте useNavigate
import { debounce } from "@mui/material";
import image from "../assets/1056868.512.webp";

interface Props {
  className?: string;
}

export const Input: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState<ListArray | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate(); // Используйте useNavigate

  const debouncedSearch = debounce(async (term: string) => {
    setLoading(true);
    if (term) {
      const data = await searchAnime(term);
      setAnimeList(data);
    } else {
      setAnimeList([]);
    }
    setLoading(false);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.clear();
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
    setAnimeList([]);
  }, [location]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Обработчик для кнопки "Ещё"
  const handleMoreClick = () => {
    navigate(`/filters?searchTerm=${encodeURIComponent(searchTerm)}`);
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

      {searchTerm && (
        <div
          className="popover"
          style={{ position: "absolute", top: "100%", left: 0, zIndex: 1 }}
        >
          <ul className="search_items">
            {loading ? (
              <div className="loading-search_image">
                <p>Будь терпеливее сенпай...</p>
                <img src={image} alt="" />
              </div>
            ) : (
              <>
                {animeList?.length === 0 ? (
                  <h2 style={{ textAlign: "center", padding: 20 }}>
                    Ничего не найдено :(
                  </h2>
                ) : (
                  <>
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
                    <button className="more-button" onClick={handleMoreClick}>
                      Ещё
                    </button>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
