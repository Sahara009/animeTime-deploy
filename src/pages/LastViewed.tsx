import React, { useEffect, useState } from "react";
import { List } from "../types/schedule.type";
import { AnimeCard } from "../components";

export const LastViewed = () => {
  const [title, setTitles] = useState<List[]>([]);
  console.log(setTitles, title);

  useEffect(() => {
    const valuesArray = Object.keys(localStorage)
      .map((key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      })
      .filter((item) => item !== null);

    const titleList = valuesArray
      .map((item) => item.title)
      .filter((title) => title !== undefined);
    console.log(titleList);
    if (titleList) {
      setTitles(titleList);
    }
  }, []);

  if (title.length == 0) {
    return <h1>список пуст</h1>;
  }

  return (
    <div style={{ marginBottom: 40 }} className="container">
      <h1 style={{ marginBottom: 10 }}>Недавно смотрели</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
        {title.map((anime, index) => (
          <div style={{ width: 200 }} key={index}>
            <AnimeCard item={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};
