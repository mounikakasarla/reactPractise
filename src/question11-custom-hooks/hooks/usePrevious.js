import { useEffect, useRef } from 'react';

// Returns the value from the PREVIOUS render.
// const prevCount = usePrevious(count);
export default function usePrevious(value) {
  const ref = useRef(undefined);

  // Runs AFTER render, so during render ref.current still holds the old value
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
