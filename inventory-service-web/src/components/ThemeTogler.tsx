import React, { FC, useContext } from 'react';
import { Theme, ThemeContext } from '../services/ThemeProvider/lib/ThemeContext';
import MoonIcon from '../assets/moon.svg';
import SunIcon from '../assets/sun.svg';
import '../styles/ThemeTogler.css'; 

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <button className={"theme-toggle"} onClick={toggleTheme}>
      {theme === Theme.DARK ? <img src={SunIcon} alt="Switch to light theme" /> : <img src={MoonIcon} alt="Switch to dark theme" />}
    </button>
  );
};

export default ThemeToggle;
