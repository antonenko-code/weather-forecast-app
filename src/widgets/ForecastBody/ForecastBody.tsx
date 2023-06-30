import React, { useMemo } from 'react';
import styles from './ForecastBody.module.scss';
import { WeatherDataTemplate } from '../../types/PreparedWeatherData';
import classNames from 'classnames';
import { IoThermometerOutline } from 'react-icons/io5';
import { IndexItem } from '../../shared/IndexItem';
import {
  WiBarometer,
  WiCloudyGusts,
  WiDirectionDownRight,
  WiDirectionUpLeft,
  WiHumidity,
  WiRainMix,
} from 'react-icons/wi';

type Props = {
  currentWeather: WeatherDataTemplate,
};

export const ForecastBody: React.FC<Props> = ({ currentWeather }) => {
  const indexes = useMemo(() => {
    return [
      { icon: <WiDirectionUpLeft />, title: 'Max degrees', value: `${currentWeather.weather.max} °C` },
      { icon: <WiDirectionDownRight />, title: 'Min degrees', value: `${currentWeather.weather.min} °C` },
      { icon: <WiRainMix />, title: 'Precipitation', value: `${currentWeather.weather.precipitation}%` },
      { icon: <WiBarometer />, title: 'Pressure', value: `${currentWeather.weather.pressure} mm` },
      { icon: <WiHumidity />, title: 'Humidity', value: `${currentWeather.weather.humidity}%` },
      { icon: <WiCloudyGusts />, title: 'Wind', value: `${currentWeather.weather.wind} m/s` },
    ]
  }, [currentWeather])

  return (
    <div className={styles.container}>
      <div className={styles.media}>
        <div className={classNames(styles.image, currentWeather.weather.icon)}></div>
        <span className={styles.date}>
          {`${currentWeather.date.month} ${currentWeather.date.day} ${currentWeather.date.weekday}`}
        </span>
        <h3 className={styles.weather}>{currentWeather.weather.type}</h3>
      </div>
      <div className={styles.info}>
        <div className={styles.degrees}>
          <div className={styles.thermometer}>
            <IoThermometerOutline />
          </div>
          {`${currentWeather.weather.temp}°C`}
        </div>

        <div className={styles.indexes}>
          {indexes.map(({ title, value, icon }) => (
            <IndexItem
              key={title}
              title={title}
              value={value}
            >
              {icon}
            </IndexItem>
          ))}
        </div>
      </div>
    </div>
  );
};
