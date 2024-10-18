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
    if (data && data.length > 0) {
      setList((prevList) => {
        const uniqueData = data.filter(
          (newItem) => !prevList.some((item) => item.id === newItem.id)
        );
        return [...prevList, ...uniqueData];
      });
    } else {
      setHasMore(false);
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    createList(page);
  }, [page]);

  if (list.length === 0) {
    return (
      <div className="skeletons container">
        <Skeleton baseColor="#363737" className="skeleton-list" count={15} />
      </div>
    );
  }

  return (
    <div className=" container list">
      <h1 className=" animeList-title">Сейчас популярно</h1>
      <nav>
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<img className="loading" src={loading} alt="Loading..." />}
        >
          <ul className="list_anime">
            {list.map((item) => (
              <div className="list_anime-item" key={item.id}>
                <AnimeCard item={item} />
              </div>
            ))}
          </ul>
        </InfiniteScroll>
      </nav>
    </div>
  );
};
