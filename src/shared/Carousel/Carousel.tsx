import React, { ReactNode, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import 'swiper/scss'
import { FreeMode, Mousewheel } from 'swiper';
import { Tabs } from '../../types/Tabs';

type Props = {
  children: ReactNode,
  currentTab: Tabs
};

export const Carousel: React.FC<Props> = ({ children, currentTab }) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const weather = useAppSelector((state) => state.weather.value)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (swiperRef) {
      timeoutId = setTimeout(() => {
        swiperRef.update();
      }, 500)
    }

    return () => clearTimeout(timeoutId);
  }, [swiperRef, weather, currentTab])
  return (
    <Swiper
      onSwiper={setSwiperRef}
      direction={'horizontal'}
      slidesPerView={'auto'}
      spaceBetween={30}
      grabCursor={true}
      freeMode={true}
      mousewheel={true}
      modules={[FreeMode, Mousewheel]}
    >
      {React.Children.toArray(children).map((child, index) => (
        <SwiperSlide key={index}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
