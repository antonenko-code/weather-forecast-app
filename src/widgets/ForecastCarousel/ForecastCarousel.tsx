import React, { useRef, useState } from 'react';
import styles from './ForecastCarousel.module.scss';
import { ForecastItem } from '../../entities/ForecastItem';
import { Carousel } from '../../shared/Carousel';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Tabs } from '../../types/Tabs';
import classNames from 'classnames';

type Props = {
  selectedItem: number | string,
  setSelectedItem: (value: number | string) => void,
};

export const ForecastCarousel: React.FC<Props> = React.memo(({selectedItem, setSelectedItem}) => {
  const weather = useAppSelector((state) => state.weather.value)
  const [currentTab, setCurrentTab] = useState(Tabs.Daily)
  const tabsRef = useRef<HTMLUListElement>(null)

  const handleSelectTab = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget.dataset.name as Tabs;

    if (tabsRef.current) {
      tabsRef.current.style.setProperty('--decoration-left', `${event.currentTarget.offsetLeft}px`)
      tabsRef.current.style.setProperty('--decoration-width', `${event.currentTarget.offsetWidth}px`)
    }

    if (target) {
      setCurrentTab(target);
    }
  }

  console.log('... render')


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Forecast</h2>
        <ul className={styles.tabs} ref={tabsRef}>
          {Object.values(Tabs).map(value => (
            <li
              data-name={value}
              className={classNames(styles.tab, {[styles.selected]: currentTab === value})}
              onClick={handleSelectTab}
              key={value}
            >
              {value}
            </li>
          ))}
        </ul>

      </div>

      {currentTab === Tabs.Daily ? (
        <Carousel>
          {weather?.daily.map((item, index) => (
            <ForecastItem
              key={item.id}
              index={index}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              item={item}
            />
          ))}
        </Carousel>
      ) : (
        <Carousel>
          {weather?.hourly.map((item, index) => (
            <ForecastItem
              key={item.id}
              index={index}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              item={item}
            />
          ))}
        </Carousel>
      )}

    </div>
  );
});
