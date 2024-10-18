import React from "react";
import { LastViewed } from "./LastViewed";
import { AnimeList } from "../components";
import { NewsList } from "../components/NewsList";

interface Props {
  className?: string;
}

export const Homepage: React.FC<Props> = () => {
  return (
    <>
      <div>
        <LastViewed />
        <NewsList />
        <AnimeList />
      </div>
    </>
  );
};
