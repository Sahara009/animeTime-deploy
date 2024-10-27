import React, { useEffect, useState } from "react";
import { getFranchiseList } from "../api";
import { List } from "../types/schedule.type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Skeleton from "react-loading-skeleton";

interface Youtube {
  comments: number;
  id: number;
  preview: {
    src: string;
    thumbnail: string;
  };
  timestamp: number;
  title: string;
  views: number;
  youtube_id: string;
}

interface Franchise {
  id: number;
  youtube?: Youtube;
  title?: List;
}

interface Props {
  className?: string;
}

export const NewsList: React.FC<Props> = () => {
  const [list, setList] = useState<Franchise[]>([]);

  const createList = async () => {
    const data = await getFranchiseList();
    if (data) {
      // console.log(data);
      setList(data);
    }
  };

  useEffect(() => {
    createList();
  }, []);

  if (list.length == 0) {
    return (
      <div className="list_franchise-skeleton container">
        <h1 className="mainTitle">Новости</h1>
        <Skeleton baseColor="#363737" count={3} />
      </div>
    );
  }

  const youtubeList = list.filter((item) => item.youtube);

  return (
    <div className="container list">
      <h1 className="mainTitle">Новости</h1>
      <nav>
        <Swiper
          spaceBetween={20}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          breakpoints={{
            1065: {
              slidesPerView: 3,
            },
            760: {
              slidesPerView: 3,
            },
            630: {
              slidesPerView: 3,
            },
            300: {
              slidesPerView: 2,
            },
          }}
        >
          {youtubeList.map((item) => (
            <SwiperSlide
              className="list_franchise-item"
              key={item.youtube?.youtube_id}
            >
              <a
                href={`https://www.youtube.com/watch?v=${item.youtube?.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{item.youtube?.title}</h3>
                <img
                  src={`https://static-libria.weekstorm.one${item.youtube?.preview.src}`}
                  alt={item.youtube?.title}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </nav>
    </div>
  );
};
