'use client';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { THEME_TYPES } from '../types';

export const ThemeSwitch = () => {
  const [theme, setTheme] = useState<THEME_TYPES>('light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div onClick={toggleTheme} className='cursor-pointer'>
      {theme === 'light' ? <CiLight size={25} /> : <MdDarkMode size={25} />}
    </div>
  );
};
