import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Home } from "./pages/Home/Home";
import { useAppSelector } from './hooks/useAppSelector';

export function App() {
  const theme = useAppSelector((state) => state.theme.color);


  useEffect(() => {
    document.body.setAttribute('data-theme', `${theme}`)
  }, [theme])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
