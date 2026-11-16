import { useState } from 'react';

// const [isOpen, toggle] = useToggle(false);
export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}
