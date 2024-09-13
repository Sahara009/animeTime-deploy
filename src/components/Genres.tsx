import React, { useState, ChangeEvent, useEffect } from "react";
import { getGenres } from "../api";

interface GenreSelectProps {
  onGenresChange: (genres: string) => void; // Передаем строку жанров
}

const GenreSelect: React.FC<GenreSelectProps> = ({ onGenresChange }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const createGenres = async () => {
    const data = await getGenres();
    if (data) {
      setGenres(data);
    } else {
      console.log("ошибка запроса");
    }
  };

  useEffect(() => {
    createGenres();
  }, []);

  const handleGenreSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedGenres.includes(selectedValue)) {
      const updatedGenres = [...selectedGenres, selectedValue];
      setSelectedGenres(updatedGenres);
      onGenresChange(updatedGenres.join(","));
    }
  };

  const removeGenre = (genreToRemove: string) => {
    const updatedGenres = selectedGenres.filter(
      (genre) => genre !== genreToRemove
    );
    setSelectedGenres(updatedGenres);
    onGenresChange(updatedGenres.join(", "));
  };

  return (
    <div>
      <select onChange={handleGenreSelect} value="">
        <option value="" disabled>
          Жанры
        </option>
        {genres?.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <div>
        {selectedGenres.length > 0 && (
          <div>
            {selectedGenres.map((genre) => (
              <span
                key={genre}
                style={{
                  display: "inline-block",
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "rgb(14, 11, 33)",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => removeGenre(genre)}
              >
                {genre} &times;
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreSelect;
