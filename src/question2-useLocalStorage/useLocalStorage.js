import { useEffect, useState } from 'react';

// Like useState, but the value is saved to localStorage.
// const [value, setValue] = useLocalStorage('key', initialValue);
export default function useLocalStorage(key, initialValue) {
  // 1. On first render, read the saved value (or use the initial value)
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // 2. Whenever the value changes, save it
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
