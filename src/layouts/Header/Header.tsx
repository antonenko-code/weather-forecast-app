import React from 'react';
import { Theme } from '../../types/ButtonOptions';
import styles from './Header.module.scss'
import { ToggleTheme } from '../../features/ToggleTheme';
import { Button } from '../../shared/Button';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdOutlineAddLocationAlt, MdOutlineWrongLocation } from 'react-icons/md';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addToFavorites, removeFromFavorites, selectFavorite } from '../../features/Favorites/favoritesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

type Props = {
  handleToggleSidebarState: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const Header: React.FC<Props> = ({
  handleToggleSidebarState,
}) => {
  const { selected } = useAppSelector((state) => state.favorites);
  const weather = useAppSelector((state) => state.weather.value)
  const dispatch = useAppDispatch();

  const handleAddSelectedToFavorites = () => {
    if (weather) {
      dispatch(addToFavorites(weather));
      dispatch(selectFavorite(weather.location.place));
    }
  }

  const handleRemoveFromFavorites = () => {
    if (weather) {
      dispatch(removeFromFavorites(weather.location.place));
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.actions}>
        <div className={styles.showSidebar}>
          <Button label='' theme={Theme.LabeledIcon} onClick={handleToggleSidebarState}>
            <HiOutlineSquares2X2 />
          </Button>
        </div>
        {weather && (
          selected === weather.location.place ? (
            <Button
              label={weather.location.place}
              theme={Theme.LabeledIcon}
              onClick={handleRemoveFromFavorites}
            >
              <MdOutlineWrongLocation />
            </Button>
          ) : (
            <Button
              label={weather.location.place}
              theme={Theme.LabeledIcon}
              onClick={handleAddSelectedToFavorites}
            >
              <MdOutlineAddLocationAlt />
            </Button>
          )
        )}
      </div>
      <ToggleTheme />
    </header>
  );
};
