import React, { useEffect, useState } from "react";
import { List } from "../types/schedule.type";
import { AnimeCard } from "../components";
import Skeleton from "react-loading-skeleton";

export const LastViewed = () => {
  const [title, setTitles] = useState<List[]>([]);
  // console.log(setTitles, title);

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

  return title.length === 0 ? (
    <div className="skeletons container">
      <Skeleton baseColor="#363737" className="skeleton-list" count={5} />
    </div>
  ) : (
    <div className="lastviewed ">
      <div className=" container ">
        <h1 style={{ marginBottom: 10 }}>Недавно смотрели</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 30,
          }}
        >
          {title.map((anime) => (
            <div className="list_anime-item" key={anime.id}>
              <AnimeCard item={anime} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
