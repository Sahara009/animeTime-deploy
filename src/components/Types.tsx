import React, { useState, ChangeEvent } from "react";

interface TypeSelectProps {
  onTypeChange: (types: number[]) => void; // Передаем индексы как числа
}

const typesList: string[] = ["Фильм", "TV", "OVA", "ONA", "Спешил", "WEB"];

const TypesSelect: React.FC<TypeSelectProps> = ({ onTypeChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);

  const handleTypeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedIndex = Number(selectedValue);

    if (selectedValue !== "" && !selectedTypes.includes(selectedIndex)) {
      const updatedIndexes = [...selectedTypes, selectedIndex];
      setSelectedTypes(updatedIndexes);
      onTypeChange(updatedIndexes);
    }
  };

  const removeType = (typeIndexToRemove: number) => {
    const updatedIndexes = selectedTypes.filter(
      (index) => index !== typeIndexToRemove
    );
    setSelectedTypes(updatedIndexes);
    onTypeChange(updatedIndexes);
  };

  return (
    <div>
      <select onChange={handleTypeSelect} value="">
        <option value="" disabled>
          Тип
        </option>
        {typesList.map((type, index) => (
          <option key={index} value={index}>
            {type}
          </option>
        ))}
      </select>

      <div>
        {selectedTypes.length > 0 && (
          <div>
            {selectedTypes.map((index) => (
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
                onClick={() => removeType(index)}
              >
                {typesList[index]} &times;
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypesSelect;
