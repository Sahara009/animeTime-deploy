import React, { useState, ChangeEvent } from "react";

interface SeasonSelectProps {
  onSeasonsChange: (seasons: string) => void; // Передаем строку с индексами сезонов
}

const seasonsList: string[] = ["Зима", "Весна", "Лето", "Осень"];

const SeasonsSelect: React.FC<SeasonSelectProps> = ({ onSeasonsChange }) => {
  const [selectedSeasonIndexes, setSelectedSeasonIndexes] = useState<number[]>(
    []
  );

  const handleSeasonSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value); // Получаем индекс
    if (selectedValue && !selectedSeasonIndexes.includes(selectedValue)) {
      const updatedIndexes = [...selectedSeasonIndexes, selectedValue];
      setSelectedSeasonIndexes(updatedIndexes);
      onSeasonsChange(updatedIndexes.join(", ")); // Преобразуем массив индексов в строку
    }
  };

  const removeSeason = (seasonIndexToRemove: number) => {
    const updatedIndexes = selectedSeasonIndexes.filter(
      (index) => index !== seasonIndexToRemove
    );
    setSelectedSeasonIndexes(updatedIndexes);
    onSeasonsChange(updatedIndexes.join(", ")); // Преобразуем массив индексов в строку
  };

  return (
    <div>
      <select onChange={handleSeasonSelect} value="">
        <option value="" disabled>
          Сезоны
        </option>
        {seasonsList.map((season, index) => (
          <option key={index} value={index + 1}>
            {" "}
            {/* Индекс на 1 больше, так как сезоны начинаются с 1 */}
            {season}
          </option>
        ))}
      </select>

      <div>
        {selectedSeasonIndexes.length > 0 && (
          <div>
            {selectedSeasonIndexes.map((index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "rgb(14, 11, 33)",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => removeSeason(index)}
              >
                {seasonsList[index - 1]} &times;
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonsSelect;
