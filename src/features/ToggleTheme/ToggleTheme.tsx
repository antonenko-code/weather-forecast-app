import React from 'react';
import styles from './ToggleTheme.module.scss'
import { ColorTheme } from '../../types/ColorTheme';
import classNames from 'classnames';
import { BiMoon } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleTheme } from './themeSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

export const ToggleTheme = () => {
  const theme = useAppSelector((state) => state.theme.color);
  const dispatch = useAppDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
      <div
        className={styles.item}
        onClick={handleToggleTheme}
      >
        <div
          className={classNames(
            styles.toggle,
            { [styles.isToggled]: theme === ColorTheme.Light }
          )}
        >
          <div className={styles.icons}>
            <div className={classNames(
              styles.icon,
              { [styles.isActive]: theme ===  ColorTheme.Dark}
            )}>
              <BiMoon />
            </div>
            <div className={classNames(
              styles.icon,
              { [styles.isActive]: theme ===  ColorTheme.Light }
            )}>
              <MdOutlineWbSunny />
            </div>
          </div>
        </div>
      </div>
  );
};
