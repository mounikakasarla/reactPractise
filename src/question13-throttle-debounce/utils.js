// DEBOUNCE: wait until calls STOP for `delay` ms, then run once (with the last args).
// Use for: search box, auto-save, window resize "done".
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);                            // cancel the previous waiting call
    timer = setTimeout(() => fn(...args), delay);   // start waiting again
  };
}

// THROTTLE: run at most once every `limit` ms, ignore calls in between.
// Use for: scroll, mouse move, button spam, window resize while dragging.
export function throttle(fn, limit) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {                   // enough time passed?
      lastRun = now;
      fn(...args);
    }
  };
}
