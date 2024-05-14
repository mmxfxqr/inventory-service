import { FC, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Theme, ThemeContext } from '../services/ThemeProvider/lib/ThemeContext';


const ThemeToggle: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <Button variant={theme === Theme.DARK ? 'light' : 'dark'} onClick={toggleTheme}>
      Switch to {theme === Theme.DARK ? 'Light' : 'Dark'} Theme
    </Button>
  );
};

export default ThemeToggle;
