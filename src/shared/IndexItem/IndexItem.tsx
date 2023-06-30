import React, { ReactNode } from 'react';
import styles from './IndexItem.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  value: string
};

export const IndexItem: React.FC<Props> = ({ children, title, value }) => {
  return (
    <div className={styles.index}>
            <span className={styles.title}>
              <span className={styles.icon}>
                {children}
              </span>
              {`${title}:`}
            </span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
