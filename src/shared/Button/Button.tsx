import React, { ReactNode } from 'react';
import styles from './Button.module.scss'
import { Size, Theme } from '../../types/ButtonOptions';
import classNames from 'classnames'



type Props = {
  label: string,
  size?: Size,
  theme?: Theme,
  type?: 'button',
  children?: ReactNode,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export const Button: React.FC<Props> = ({
  label,
  size = Size.Large,
  theme = Theme.Outline,
  type,
  children,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        styles.item,
        styles[theme],
        styles[size]
      )}
      onClick={onClick}
    >
      {children && (
        <div className={styles.icon}>
          {children}
        </div>
      )}
      {label && (
        <span className={styles.label}>
          {label}
        </span>
      )}
    </button>
  );
};
