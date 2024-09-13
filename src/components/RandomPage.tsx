import React, { useEffect, useState } from "react";
import { getRandomTitle } from "../api";
import { AnimeCard } from "./AnimeCard";
import { List } from "../types/schedule.type";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

interface Props {
  className?: string;
}

export const RandomPage: React.FC<Props> = () => {
  const [random, setRandom] = useState<List | undefined>();

  const getRandom = async () => {
    const data = await getRandomTitle();
    if (data) {
      setRandom(data);
    }
  };
  useEffect(() => {
    getRandom();
  }, []);

  if (!random) {
    return (
      <div className="skeleton_randon-wrapper">
        <Skeleton
          baseColor="#363737"
          className="randon_skeleton"
          width={300}
          height={428}
        />
        <Skeleton
          baseColor="#363737"
          className="randon_skeleton-button"
          width={140}
          height={50}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="randompage">
        <AnimeCard item={random} />
        <Link to={`/serials/${random?.code}`}>
          <button>Смотреть</button>
        </Link>
      </div>
    </div>
  );
};
