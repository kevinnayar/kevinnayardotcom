import { useState, useEffect } from 'react';

type ThemeType = 'dark' | 'light';

function useTheme(key: string, fallback: ThemeType = 'light') {
  const [theme, setTheme] = useState<null | ThemeType>();

  const set = (newTheme: ThemeType) => {
    setTheme(newTheme);
    window.localStorage.setItem(key, newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const exisingTheme = window.localStorage.getItem(key) as ThemeType;
    const defaultTheme = exisingTheme || fallback;
    set(defaultTheme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    set(newTheme);
  };

  return {
    theme,
    toggle,
  };
}

const ThemeSwitcher = () => {
  const { theme, toggle } = useTheme('__kaynay_theme__');

  return (
    <div className={`theme-switcher theme-switcher__${theme}`} onClick={toggle}>
      <div className="theme-switcher-button" />
    </div>
  );
};

export default ThemeSwitcher;
