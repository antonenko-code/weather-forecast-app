import React, { useState } from 'react';
import styles from './Search.module.scss';
import { Theme } from '../../types/ButtonOptions';
import { ErrorsMessages } from '../../types/ErrorsMessages';
import { Input } from '../../shared/Input';
import { MdSearch } from 'react-icons/md';
import { Button } from '../../shared/Button';
import { TbCurrentLocation } from 'react-icons/tb';
import { searchByPlace } from '../../utils/searchByPlace';
import { getCurrentLocation } from '../../utils/getCurrentLocation';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setWeather } from '../Weather/weatherSlice';
import { clearErrors, setError, setIsLoading } from '../Execution/executionSlice';
import { selectFavorite } from '../Favorites/favoritesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

type Props = {
  handleToggleSidebarState: () => void,
};

export const Search: React.FC<Props> = ({ handleToggleSidebarState }) => {
  const [searchValue, setSearchValue] = useState({ search: '' });
  const { onGetCurrentLocation } = useAppSelector(state => state.execution.errors)
  const { search } = searchValue;
  const dispatch = useAppDispatch();

  const handleInputChange = ({ target:{ name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((prev) => ({ ...prev, [name]: value }));
    dispatch(setError({ onGetCurrentLocation: null }))
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setIsLoading(true));
    dispatch(setWeather(null));
    dispatch(clearErrors())

    try {
      dispatch(setWeather(await searchByPlace(search)))
      setSearchValue((prev) => ({ ...prev, search: '' }))
      handleToggleSidebarState();
    } catch {
      dispatch(setError({ onLoading: ErrorsMessages.onLoading }))

    } finally {
      dispatch(setIsLoading(false));
    }
  }

  const handleSetCurrentLocation = async () => {
    dispatch(setIsLoading(true));
    dispatch(setWeather(null));
    dispatch(clearErrors())

    try {
      const { coords: { latitude, longitude } } = await getCurrentLocation();
      dispatch(setWeather(await searchByPlace({lat: latitude, lon: longitude})));
      dispatch(selectFavorite(null));
    } catch {
      dispatch(setError({
        onGetCurrentLocation: ErrorsMessages.onGetLocation,
        onLoading: ErrorsMessages.onLoading,
      }))
    } finally {
      dispatch(setIsLoading(false));
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <Input
            id='search'
            type='text'
            value={search}
            name='search'
            placeholder='Search for a city or airport'
            onChange={handleInputChange}
          >
            <MdSearch />
          </Input>
        </form>
        <Button label='' theme={Theme.LabeledIcon} onClick={handleSetCurrentLocation}>
          <TbCurrentLocation />
        </Button>
      </div>

      {onGetCurrentLocation && (
        <span className={styles.error}>
          {onGetCurrentLocation}
        </span>
      )}
    </div>
  );
};
