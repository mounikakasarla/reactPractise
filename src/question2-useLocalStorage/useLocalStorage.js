import { useCallback, useEffect, useState } from 'react';

/**
 * useLocalStorage — like useState, but the value is persisted to localStorage.
 *
 * const [value, setValue, removeValue] = useLocalStorage('key', initialValue);
 *
 * - Lazy init: reads localStorage only on first render
 * - Safe: handles bad JSON / unavailable storage (private mode, SSR)
 * - Supports functional updates: setValue(prev => prev + 1)
 * - Syncs across browser tabs via the 'storage' event
 */
function readValue(key, initialValue) {
  const fallback =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  if (typeof window === 'undefined') return fallback; // SSR guard

  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`useLocalStorage: error reading key "${key}"`, error);
    return fallback;
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readValue(key, initialValue)
  );

  // Write to localStorage whenever the value (or key) changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: error writing key "${key}"`, error);
    }
  }, [key, storedValue]);

  // Keep other tabs in sync (the 'storage' event fires only in OTHER tabs)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.storageArea !== window.localStorage || e.key !== key) return;
      try {
        setStoredValue(e.newValue !== null ? JSON.parse(e.newValue) : readValue(key, initialValue));
      } catch {
        /* ignore malformed values from other tabs */
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // initialValue intentionally omitted: callers often pass a new literal each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Same API as useState's setter (accepts value or updater function)
  const setValue = useCallback((value) => {
    setStoredValue((prev) => (typeof value === 'function' ? value(prev) : value));
  }, []);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setStoredValue(readValue(key, initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, removeValue];
}
