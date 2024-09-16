import React, { useState } from "react";
import { List } from "../types/schedule.type";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

interface Props {
  className?: string;
  item?: List;
  onImageLoad?: () => void;
}

export const AnimeCard: React.FC<Props> = ({
  item,
  className,
  onImageLoad,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onImageLoad) {
      onImageLoad();
    }
  };

  return (
    <div key={item?.id} style={{ position: "relative" }} className={className}>
      <Link to={`/serials/${item?.code}`}>
        {!imageLoaded && (
          <Skeleton
            baseColor="#363737"
            className="skeleton-placeholder"
            width={300}
            height={428}
          />
        )}
        <img
          className="posters-item"
          src={`https://static-libria.weekstorm.one${item?.posters.original.url}`}
          alt={item?.names.ru || "картинка"}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        <p className="anime_name">{item?.names.ru}</p>
      </Link>
    </div>
  );
};
