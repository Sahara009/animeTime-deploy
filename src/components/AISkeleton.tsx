import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  className?: string;
}

export const AISkeleton: React.FC<Props> = () => {
  return (
    <div className="animeInfo-wrapper container">
      <div className="  animeInfo_skeleton" style={{ paddingTop: 40 }}>
        <div style={{ width: 250 }}>
          <Skeleton baseColor="#363737" className="animeInfo_skeleton-poster" />
        </div>

        <div className="animeInfo_skeleton-title">
          <Skeleton
            baseColor="#363737"
            style={{ marginBottom: 10 }}
            height={50}
          />
          <Skeleton
            baseColor="#363737"
            style={{ marginBottom: 5 }}
            className="animeInfo_skeleton-desc"
          />
          <Skeleton
            baseColor="#363737"
            style={{ marginBottom: 15 }}
            width={110}
            height={35}
          />
          <Skeleton
            baseColor="#363737"
            style={{ marginBottom: 5 }}
            width={250}
            height={25}
            count={3}
          />
          <Skeleton baseColor="#363737" width={250} height={25} />
        </div>
      </div>
      <Skeleton
        baseColor="#363737"
        style={{ marginTop: 20 }}
        width={135}
        height={55}
      />
      <Skeleton
        baseColor="#363737"
        style={{ marginTop: 10 }}
        className="player_skeleton"
      />
    </div>
  );
};
