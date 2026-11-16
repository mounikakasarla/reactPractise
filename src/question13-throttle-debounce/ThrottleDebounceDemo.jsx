import { useMemo, useState } from 'react';
import { debounce, throttle } from './utils.js';

const DELAY = 1000; // 1 second, so the difference is easy to see

const card = {
  flex: 1,
  padding: 12,
  border: '1px solid #ddd',
  borderRadius: 6,
  minWidth: 0,
  overflowWrap: 'anywhere',
};

export default function ThrottleDebounceDemo() {
  const [normal, setNormal] = useState({ value: '', calls: 0 });
  const [debounced, setDebounced] = useState({ value: '', calls: 0 });
  const [throttled, setThrottled] = useState({ value: '', calls: 0 });

  // Create each wrapped function ONCE (useMemo), otherwise every render
  // would make a brand-new debounce/throttle with its own fresh timer.
  const debouncedUpdate = useMemo(
    () => debounce((value) => setDebounced((s) => ({ value, calls: s.calls + 1 })), DELAY),
    []
  );
  const throttledUpdate = useMemo(
    () => throttle((value) => setThrottled((s) => ({ value, calls: s.calls + 1 })), DELAY),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setNormal((s) => ({ value, calls: s.calls + 1 })); // runs on every key press
    debouncedUpdate(value);
    throttledUpdate(value);
  };

  return (
    <main className="app" style={{ maxWidth: 720 }}>
      <h1>Throttle vs Debounce</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        Type fast for a few seconds, then stop. Delay is {DELAY / 1000}s.
      </p>

      <input
        onChange={handleChange}
        placeholder="Type here..."
        style={{ width: '100%', padding: 8, marginBottom: 16 }}
      />

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Normal</h3>
          <p>Calls: <strong>{normal.calls}</strong></p>
          <p>"{normal.value}"</p>
          <small>Every key press.</small>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Debounce</h3>
          <p>Calls: <strong>{debounced.calls}</strong></p>
          <p>"{debounced.value}"</p>
          <small>Once, 1s after you stop typing.</small>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Throttle</h3>
          <p>Calls: <strong>{throttled.calls}</strong></p>
          <p>"{throttled.value}"</p>
          <small>At most once per second while typing.</small>
        </div>
      </div>
    </main>
  );
}
