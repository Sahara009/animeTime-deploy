import React, { useEffect, useState } from "react";
import { getTitleSchedule } from "../api";
import { ScheduleArray } from "../types/schedule.type";
import { AnimeCard } from "../components/AnimeCard";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const daysOfWeek: string[] = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export const Shedules = () => {
  const [schedule, setSchedule] = useState<ScheduleArray>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createSchedule = async () => {
    setIsLoading(true);
    try {
      const data = await getTitleSchedule();
      if (data) {
        setSchedule(data);
      } else {
        setError("Не удалось загрузить расписание");
      }
    } catch (error) {
      console.log(error);
      setError("Ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createSchedule();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <h1 className="title_main">
          {isLoading ? (
            <Skeleton
              className="slogan-skeleton"
              baseColor="#363737"
              width="90%"
            />
          ) : (
            "Сначала работа, потом аниме. Или наоборот? Главное — не пропустить новые серии!"
          )}
        </h1>

        {error && <p>{error}</p>}

        <ul>
          {daysOfWeek.map((day, index) => (
            <li className="days" key={index}>
              <p className="day">
                {isLoading ? (
                  <Skeleton baseColor="#363737" width={260} height={35} />
                ) : (
                  `${day}:`
                )}
              </p>
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
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <SwiperSlide key={i}>
                          <Skeleton
                            baseColor="#363737"
                            className="skeleton-placeholder"
                          />
                        </SwiperSlide>
                      ))
                    : schedule[index]?.list?.map((item) => (
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
  );
};
