import React, { useEffect } from 'react';
import styles from './ForecastItem.module.scss';
import classNames from 'classnames';
import { WeatherDataTemplate } from '../../types/PreparedWeatherData';

type Props = {
  item: WeatherDataTemplate,
  index: number,
  selectedItem: number | string,
  setSelectedItem: (value: number | string) => void,

};

export const ForecastItem: React.FC<Props> = ({
  item,
  index,
  selectedItem,
  setSelectedItem,
}) => {
  const isNow = index === 0;
  const isSelected = selectedItem === item.id;
  const weekday = isSelected ? item.date.weekday : item.date.weekday.substring(0, 3)
  let title = isNow ? 'Today' : weekday;

  if (item.date.time) {
    title = isNow ? 'Now' : item.date.time;
  }

  useEffect(() => {
    if (isNow) {
      setSelectedItem(item.id)
    }
  }, [])


  const handleSelectItem = () => setSelectedItem(item.id);

  return (
    <div className={classNames(styles.item, { [styles.isSelected]: isSelected })} onClick={handleSelectItem}>
      {selectedItem === item.id ? (
        <>
          <h2 className={styles.day}>{title}</h2>
          <div className={styles.media}>
            <h2 className={styles.degrees}>{`${item.weather.temp}°`}</h2>
            <div className={classNames(styles.image, item.weather.icon)}></div>
          </div>
          <div className={styles.weather}>
            <div className={styles.description}>
              {item.weather.type}
              <span className={styles.precipitation}>{`${item.weather.precipitation}%`}</span>
            </div>
            <div className={styles.range}>
              Max: <span className={styles.value}>{`${item.weather.max}°`}</span>&nbsp;
              Min: <span className={styles.value}>{`${item.weather.min}°`}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.day}>{title}</h2>
          <div className={styles.media}>
            <div className={classNames(styles.image, item.weather.icon)}></div>
            <span className={styles.precipitation}>{`${item.weather.precipitation}%`}</span>
          </div>
          <h2 className={styles.degrees}>{`${item.weather.temp}°`}</h2>
        </>
      )}
    </div>
  );
};
