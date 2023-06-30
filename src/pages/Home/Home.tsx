import React, { useState } from 'react';
import styles from './Home.module.scss'
import { Header } from '../../layouts/Header';
import { Sidebar } from '../../layouts/Sidebar';
import { Forecast } from '../../widgets/Forecast';

export const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleToggleSidebarState = () => setIsSidebarVisible(prev => !prev);

  return (
        <div className={styles.container}>
          <Sidebar
            handleToggleSidebarState={handleToggleSidebarState}
            isSidebarVisible={isSidebarVisible}
          />
          <main className={styles.body}>
            <Header
              handleToggleSidebarState={handleToggleSidebarState}
            />
            <Forecast />
          </main>

        </div>
    );
};
