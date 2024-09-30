import React, { useState, useEffect } from "react";
import { Slider, Box, Typography } from "@mui/material";
import { getYears } from "../api";

interface RangeYearProps {
  onRangeChange: (years: string) => void;
}

export const RangeYear: React.FC<RangeYearProps> = ({ onRangeChange }) => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedRange, setSelectedRange] = useState<number[]>([1995, 2024]);

  useEffect(() => {
    const fetchYears = async () => {
      const yearsData = await getYears();
      if (yearsData) {
        const filteredYears = yearsData.filter((year) => year <= 2024);
        console.log(filteredYears);
        setYears(filteredYears);
      }
    };
    fetchYears();
  }, []);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const selectedYears = newValue as number[];
    setSelectedRange(selectedYears);

    const yearsRange = Array.from(
      { length: selectedYears[1] - selectedYears[0] + 1 },
      (_, i) => selectedYears[0] + i
    );

    onRangeChange(yearsRange.join(","));
  };

  return (
    <Box sx={{ width: 300, maxWidth: 250, margin: "20px auto" }}>
      <Typography gutterBottom>Выберите год</Typography>
      {years.length > 0 ? (
        <Slider
          value={selectedRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={years[0]}
          max={years[years.length - 1]}
          marks
        />
      ) : (
        <Typography>Загрузка годов...</Typography>
      )}
    </Box>
  );
};
