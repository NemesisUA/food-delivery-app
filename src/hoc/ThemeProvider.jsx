import { createContext, useState, useEffect} from 'react';
import { LocalStorageService, LS_KEYS } from "../servises/localStorage";

const ThemeContext = createContext();

const ThemeProvider = ({ children}) => {
  const [theme, setTheme] = useState(
    LocalStorageService.get(LS_KEYS.THEME) || 'dark');

  const toggleTheme = () => {
    setTheme(theme => theme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.THEME, theme)
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
      { children }
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider}
