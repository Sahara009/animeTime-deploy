import React, { useEffect, useState } from "react";
import { getAnimeUpdates } from "../api";
import { List } from "../types/schedule.type";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimeCard } from "./AnimeCard";
import Skeleton from "react-loading-skeleton";
import loading from "../assets/river-city-girls-rcg.gif";

interface Props {
  className?: string;
}

export const AnimeList: React.FC<Props> = () => {
  const [list, setList] = useState<List[]>([]);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const createList = async (pageNumber: number) => {
    const data = await getAnimeUpdates(pageNumber);
    if (data) {
      setList((prevList) => [...prevList, ...data]);
      if (data.length === 0) {
        setHasMore(false);
      }
    } else {
      console.log("ошибка запроса");
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    createList(page);
  }, [page]);

  console.log(list);

  if (list.length == 0) {
    return (
      <div className="skeletons container">
        <Skeleton
          baseColor="#363737"
          className="skeleton"
          width={245}
          height={350}
          count={15}
        />
      </div>
    );
  }

  return (
    <div className="list">
      <nav className="container">
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<img className="loading" src={loading} />}
        >
          <ul className="list_anime">
            {list.map((item, index) => (
              <div className="list_anime-item">
                <AnimeCard key={index} item={item} />
              </div>
            ))}
          </ul>
        </InfiniteScroll>
      </nav>
    </div>
  );
};
