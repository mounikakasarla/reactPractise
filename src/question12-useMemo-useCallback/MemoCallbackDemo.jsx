import { memo, useCallback, useMemo, useState } from 'react';

const box = { padding: 12, marginBottom: 16, border: '1px solid #ddd', borderRadius: 6 };

// ─────────────────────────────────────────────
// 1. useMemo: remember the RESULT of a slow calculation
// ─────────────────────────────────────────────
function slowSquare(n) {
  console.log('🐢 slowSquare ran');
  const start = performance.now();
  while (performance.now() - start < 500) {} // fake 0.5s of work
  return n * n;
}

function UseMemoExample() {
  const [number, setNumber] = useState(2);
  const [dark, setDark] = useState(false);

  // Only recalculates when `number` changes.
  // Toggling the theme re-renders, but reuses the saved result → instant.
  const squared = useMemo(() => slowSquare(number), [number]);

  // Without useMemo, every render (even the theme toggle) would freeze 0.5s:
  // const squared = slowSquare(number);

  return (
    <section style={{ ...box, background: dark ? '#1f2937' : '#fff', color: dark ? '#fff' : '#111' }}>
      <h3>useMemo</h3>
      <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
      <p>
        {number}² = {squared}
      </p>
      <button onClick={() => setDark((d) => !d)}>Toggle theme (instant)</button>
      <p style={{ fontSize: 13, opacity: 0.7 }}>
        Changing the number is slow (recalculates). Toggling the theme is instant (cached).
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────
// 2. useCallback: remember the FUNCTION itself
// ─────────────────────────────────────────────

// memo(): skip re-rendering if props are the same as last time
const ChildButton = memo(function ChildButton({ onClick, label }) {
  console.log(`🔁 ChildButton "${label}" rendered`);
  return <button onClick={onClick}>{label}</button>;
});

function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Same function object on every render → memo(ChildButton) can skip re-rendering
  const increment = useCallback(() => setCount((c) => c + 1), []);

  // New function object on every render → ChildButton re-renders every time
  const incrementNoCallback = () => setCount((c) => c + 1);

  return (
    <section style={box}>
      <h3>useCallback + memo</h3>
      <p>Count: {count} | Other: {other}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <ChildButton onClick={increment} label="With useCallback" />
        <ChildButton onClick={incrementNoCallback} label="Without useCallback" />
        <button onClick={() => setOther((o) => o + 1)}>Change unrelated state</button>
      </div>

      <p style={{ fontSize: 13, opacity: 0.7 }}>
        Open the console and click "Change unrelated state": only the "Without useCallback"
        button re-renders.
      </p>
    </section>
  );
}

export default function MemoCallbackDemo() {
  return (
    <main className="app">
      <h1>useMemo & useCallback</h1>
      <UseMemoExample />
      <UseCallbackExample />
    </main>
  );
}
