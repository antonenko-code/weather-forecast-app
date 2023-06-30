import React, { ReactNode, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import 'swiper/scss'

type Props = {
  children: ReactNode,
};

export const Carousel: React.FC<Props> = ({ children }) => {
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
  }, [swiperRef, weather])
  return (
    <Swiper
      onSwiper={setSwiperRef}
      direction={'horizontal'}
      slidesPerView={'auto'}
      spaceBetween={30}
      grabCursor={true}
    >
      {React.Children.toArray(children).map((child, index) => (
        <SwiperSlide key={index}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
