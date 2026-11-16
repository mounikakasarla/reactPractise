import { useEffect, useState } from 'react';

// const { width, height } = useWindowSize();
export default function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // cleanup
  }, []);

  return size;
}
