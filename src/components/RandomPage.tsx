import React, { useEffect, useState } from "react";
import { getRandomTitle } from "../api";
import { AnimeCard } from "./AnimeCard";
import { List } from "../types/schedule.type";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const RandomPage: React.FC<Props> = () => {
  const [random, setRandom] = useState<List | undefined>();
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const getRandom = async () => {
    const data = await getRandomTitle();
    if (data) {
      setRandom(data);
    } else {
      console.log("ошибка запроса");
    }
  };

  useEffect(() => {
    getRandom();
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="container">
      <div className="randompage">
        <AnimeCard item={random} onImageLoad={handleImageLoad} />
        {imageLoading && <></>}
        <Link to={`/serials/${random?.code}`}>
          <button>Смотреть</button>
        </Link>
      </div>
    </div>
  );
};
