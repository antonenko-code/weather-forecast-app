import React, { useEffect } from 'react';
import styles from './FavoriteItem.module.scss';
import { PreparedWeatherData } from '../../types/PreparedWeatherData';
import { Size } from '../../types/ButtonOptions';
import classNames from 'classnames';
import { Button } from '../../shared/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeFromFavorites, selectFavorite } from '../../features/Favorites/favoritesSlice';
import { setWeather } from '../../features/Weather/weatherSlice';
import { setError } from '../../features/Execution/executionSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

type Props = {
  item: PreparedWeatherData,
};

export const FavoriteItem: React.FC<Props> = ({
  item,
}) => {
  const { selected } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  const isSelected = selected === item.location.place;

  useEffect(() => {
    if (isSelected) {
      dispatch(setWeather(item))
    }
  },[])

  const handleSelectItem = () => {
    dispatch(selectFavorite(item.location.place));
    dispatch(setWeather(item))
    dispatch(setError({onLoading: null, onGetCurrentLocation: null }))
  };

  const handleRemoveItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(removeFromFavorites(item.location.place));
  }

  return (
    <div className={classNames(styles.item, { [styles.isSelected]: isSelected })} onClick={handleSelectItem}>
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <clipPath id="clip-path" clipPathUnits="objectBoundingBox">
          <path
            d="M0,0.175 C0,0.065,0.053,-0.016,0.109,0.009 L0.95,0.386 C0.979,0.399,1,0.45,1,0.508 V0.88 C1,0.949,0.971,1,0.935,1 H0.065 C0.029,1,0,0.949,0,0.88 V0.175"
            fill="url(#paint0_linear_37_712)"
          />
        </clipPath>
      </svg>

      <div className={styles.main}>
        <h2 className={styles.degrees}>{item.current.weather.temp}°</h2>
        <div className={classNames(styles.image, item.current.weather.icon)}></div>
      </div>
      <div className={styles.info}>
        <div className={styles.range}>
          Min: <span className={styles.value}>{item.current.weather.min}°C</span>&nbsp;
          Max: <span className={styles.value}>{item.current.weather.max}°C</span>
        </div>
        <div className={styles.location}>
          {item.location.place}
          <Button label='Remove' size={Size.Medium} onClick={handleRemoveItem} />
        </div>
      </div>
    </div>
  );
};
