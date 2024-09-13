import React, { useState, useEffect, useCallback } from "react";
import { Slider, debounce } from "@mui/material";

import { getYears } from "../api";

interface Props {
  className?: string;
  onRangeChange: (yearsString: string) => void;
}

export const RangeYear: React.FC<Props> = ({ onRangeChange }) => {
  const [yearsRange, setYearsRange] = useState<number[]>([1996, 2024]);

  // Используем debounce для функции, которая передает данные родителю
  const debouncedOnRangeChange = useCallback(
    debounce((yearsString: string) => onRangeChange(yearsString), 200),
    [onRangeChange]
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setYearsRange(newValue as number[]);
  };

  const getYearsBetween = (start: number, end: number) => {
    const years: number[] = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  };

  const createSchedule = async () => {
    const data = await getYears();
    if (data && data.length >= 2) {
      setYearsRange([data[0], data[data.length - 1]]);
    } else {
      console.log("ошибка запроса");
    }
  };

  useEffect(() => {
    createSchedule();
  }, []);

  useEffect(() => {
    const yearsBetweenString = getYearsBetween(
      yearsRange[0],
      yearsRange[1]
    ).join(",");
    debouncedOnRangeChange(yearsBetweenString); // Используем дебаунс
  }, [yearsRange, debouncedOnRangeChange]);

  return (
    <Slider
      value={yearsRange}
      onChange={handleChange}
      valueLabelDisplay="auto"
      min={1996}
      max={2024}
      className="slider"
    />
  );
};
