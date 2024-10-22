import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimeCard } from "../components";
import { List } from "../types/schedule.type";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface Props {
  recommendations: List[];
}

const Recommendations: React.FC<Props> = ({ recommendations }) => (
  <div style={{ marginTop: 40 }}>
    <h2 style={{ marginBottom: 10 }}>Похожее</h2>
    <Swiper
      spaceBetween={15}
      slidesPerView={4}
      navigation
      modules={[Navigation]}
    >
      {recommendations.map((anime) => (
        <SwiperSlide key={anime.code}>
          <AnimeCard item={anime} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Recommendations;
