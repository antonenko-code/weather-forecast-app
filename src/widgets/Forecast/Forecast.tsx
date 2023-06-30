import React, { useEffect, useMemo, useState } from 'react';
import { PreparedWeatherData } from '../../types/PreparedWeatherData';
import { ErrorsMessages } from '../../types/ErrorsMessages';
import { ForecastBody } from '../ForecastBody';
import { ForecastCarousel } from '../ForecastCarousel';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getCurrentLocation } from '../../utils/getCurrentLocation';
import { searchByPlace } from '../../utils/searchByPlace';
import { addToFavorites } from '../../features/Favorites/favoritesSlice';
import { setWeather } from '../../features/Weather/weatherSlice';
import { Loader } from '../../shared/Loader';
import { clearErrors, setError, setIsLoading } from '../../features/Execution/executionSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from '../Favorites/Favorites.module.scss';

export const Forecast = () => {
  const { items, selected } = useAppSelector((state) => state.favorites);
  const weather = useAppSelector((state) => state.weather.value);
  const [selectedItem, setSelectedItem] = useState<number | string>(0);
  const {
    isLoading,
    errors: { onLoading, onGetCurrentLocation },
  } = useAppSelector(state => state.execution);
  const dispatch = useAppDispatch();

  const isError = onLoading || onGetCurrentLocation;

  const setStartLocation = async () => {
    dispatch(setIsLoading(true));
    try {
      const { coords: { latitude, longitude } } = await getCurrentLocation();
      dispatch(setWeather(await searchByPlace({lat: latitude, lon: longitude})))
    } catch {
      dispatch(setWeather(await searchByPlace({lat: 50.433, lon: 30.517})))
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    dispatch(clearErrors())
    const setFavorites = async () => {
      const updatedFavorites = await Promise.all(
        items.map(async (item: PreparedWeatherData) => {
          return await searchByPlace(item.location.place)
        })
      );

      dispatch(addToFavorites(updatedFavorites))
    }

    try {
      setFavorites();
    } catch {
      dispatch(setError({onGetFavorites: ErrorsMessages.onGetFavorites}))
    }

    if (!items || !selected) {
      try {
        setStartLocation();
      } catch {
        dispatch(setError({onLoading: ErrorsMessages.onLoading}))
      }
    }
  }, []);

  const currentWeather = useMemo(() => {
    return weather?.daily.find(({ id }) => id === selectedItem)
      || weather?.hourly.find(({ id }) => id === selectedItem)

  }, [selectedItem, weather])

  return (
    <>
      {isLoading && <Loader />}
      {currentWeather && (
        <ForecastBody
          currentWeather={currentWeather}
        />
      )}
      {weather && (
        <ForecastCarousel
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      )}
      {isError && (
        <div className={styles.message}>
          <span>Oops!</span>
          {isError}
        </div>
      )}
    </>
  );
};
