import React from 'react';
import styles from './Sidebar.module.scss'
import { Theme } from '../../types/ButtonOptions';
import classNames from 'classnames';
import { Button } from '../../shared/Button';
import { MdClose } from "react-icons/md";
import { Search } from '../../features/Search';
import { Favorites } from '../../widgets/Favorites';

type Props = {
  handleToggleSidebarState: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isSidebarVisible: boolean,
};

export const Sidebar: React.FC<Props> = ({
  handleToggleSidebarState,
  isSidebarVisible,
}) => {
  return (
    <aside className={classNames(
      styles.sidebar,
      isSidebarVisible
        ? styles.isSidebarVisible
        : styles.isSidebarHidden
    )}>
      <div className={styles.container}>
        <div className={styles.sidebarItems}>
          <div className={styles.actions}>
            <h2 className={styles.title}>Select a city</h2>
            <div className={styles.hideSidebar}>
              <Button label='' theme={Theme.LabeledIcon} onClick={handleToggleSidebarState}>
                <MdClose />
              </Button>
            </div>
          </div>

          <Search />
          <Favorites />
        </div>
      </div>
    </aside>
  );
};
