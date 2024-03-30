import { useState, useEffect } from 'react';

const useTheme = () => {
  const currentTheme = localStorage.getItem('currentTheme') || 'light';

  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    // Applies the current theme when loading the hook
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-bs-theme', currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    setTheme(newTheme);
    localStorage.setItem('currentTheme', newTheme)
  };

  return [theme, toggleTheme];
};

export default useTheme;
