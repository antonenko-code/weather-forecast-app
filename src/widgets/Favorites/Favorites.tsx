import React from 'react';
import styles from './Favorites.module.scss';
import { Button } from '../../shared/Button';
import { FavoriteItem } from '../../entities/FavoriteItem';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearAllFavorites } from '../../features/Favorites/favoritesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode, Mousewheel } from "swiper";
// import "swiper/swiper.min.css";
import 'swiper/css/scrollbar';
import "swiper/css/free-mode";





export const Favorites: React.FC = () => {
  const { items } = useAppSelector((state) => state.favorites);
  const { onGetFavorites } = useAppSelector((state) => state.execution.errors);
  const dispatch = useAppDispatch();

  const handleClearAll = () => {
    dispatch(clearAllFavorites());
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <h2 className={styles.title}>Favorites</h2>
        <Button label='Clear All'  onClick={handleClearAll} />
      </div>

      {!!items.length ? (
          <Swiper
            direction={'vertical'}
            slidesPerView={'auto'}
            spaceBetween={30}
            autoHeight={true}
            freeMode={true}
            scrollbar={true}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            className="favoritesSwiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <FavoriteItem
                  item={item}
                  key={item.current.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
      ) : (
        <div className={styles.message}>
          <span>Oops!</span>
          {onGetFavorites ? onGetFavorites : 'It`s still empty here'}
        </div>
      )}
    </div>
  );
};
