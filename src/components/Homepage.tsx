import React, { useEffect, useState } from "react";
import { getTitleSchedule } from "../api";
import { ScheduleArray } from "../types/schedule.type";
import { AnimeCard } from "./AnimeCard";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Props {
  className?: string;
}
const daysOfWeek: string[] = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export const Homepage: React.FC<Props> = () => {
  const [schedule, setSchedule] = useState<ScheduleArray>([]);
  const [error, setError] = useState<string | null>(null);

  const createSchedule = async () => {
    const data = await getTitleSchedule();
    if (data) {
      setSchedule(data);
    } else {
      setError("Не удалось загрузить расписание");
    }
  };

  useEffect(() => {
    createSchedule();
  }, []);

  if (schedule.length == 0) {
    return (
      <div className="container ">
        <div className="skeleton-home">
          <Skeleton baseColor="#363737" className="skeleton_home-title" />
        </div>

        <Skeleton
          baseColor="#363737"
          style={{ width: 260, height: 30, marginTop: 40 }}
        />
        <div className="skeleton_home ">
          <Skeleton
            baseColor="#363737"
            className="skeleton"
            width={256}
            height={365}
            count={5}
          />
        </div>

        <Skeleton
          baseColor="#363737"
          style={{ width: 260, height: 30, marginTop: 40 }}
        />
        <div className="skeleton_home ">
          <Skeleton
            baseColor="#363737"
            className="skeleton"
            width={256}
            height={365}
            count={5}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="home">
        <div className="container">
          <h1 className="title_main">
            Сначала работа, потом аниме. Или наоборот? Главное — не пропустить
            новые серии!
          </h1>
          {error && <p>{error}</p>}
          <ul>
            {daysOfWeek.map((day, index) => (
              <li className="days" key={index}>
                <p className="day">{day}:</p>

                <ul className="posters">
                  <Swiper
                    spaceBetween={20}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    breakpoints={{
                      1065: {
                        slidesPerView: 5,
                      },
                      760: {
                        slidesPerView: 4,
                      },
                      630: {
                        slidesPerView: 3,
                      },
                      300: {
                        slidesPerView: 2,
                      },
                    }}
                  >
                    {schedule[index]?.list?.map((item) => (
                      <SwiperSlide key={item.id}>
                        <AnimeCard item={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
