import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  className?: string;
}

export const AISkeleton: React.FC<Props> = () => {
  return (
    <>
      <div className="animeinfo ">
        <div className="animeInfo-skeleton_poster">
          <Skeleton baseColor="#363737" width={250} height={350} />
        </div>

        <div className="animeinfo-description">
          <Skeleton
            className="animeInfo-skeleton_titleRu"
            baseColor="#363737"
            height={42}
            width="53vw"
          />
          <Skeleton
            className="animeInfo-skeleton_titleEn"
            baseColor="#363737"
            height={20}
            width="15vw"
          />
          <Skeleton
            className="animeInfo-skeleton_status"
            baseColor="#363737"
            height="7vh"
            width="100%"
          />
          <Skeleton
            baseColor="#363737"
            height={33}
            width={110}
            style={{ marginBottom: 8 }}
            className="animeInfo-skeleton_status"
          />

          <Skeleton
            baseColor="#363737"
            height={20}
            width="20%"
            className="animeInfo-skeleton_status"
          />
          <Skeleton
            baseColor="#363737"
            height={18}
            width="40%"
            style={{ marginBottom: 3 }}
            className="animeInfo-skeleton_status"
          />
          <Skeleton baseColor="#363737" height={18} width="27%" />
          <Skeleton
            baseColor="#363737"
            height={18}
            width="30%"
            style={{ marginBottom: 10 }}
          />
          <Skeleton baseColor="#363737" height={35} width={30} />
        </div>
      </div>
      <Skeleton
        baseColor="#363737"
        height={55}
        width={113}
        style={{ marginTop: 30, marginBottom: -20 }}
      />
      <Skeleton
        baseColor="#363737"
        height="70vh"
        width="100%"
        style={{ marginTop: 30 }}
      />
    </>
  );
};
