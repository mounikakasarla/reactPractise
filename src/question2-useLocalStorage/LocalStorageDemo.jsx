import useLocalStorage from './useLocalStorage.js';

// Demo: reload the page or open a second tab — values persist and sync.
export default function LocalStorageDemo() {
  const [name, setName, removeName] = useLocalStorage('demo-name', '');
  const [count, setCount, resetCount] = useLocalStorage('demo-count', 0);
  const [theme, setTheme] = useLocalStorage('demo-theme', 'light');

  const dark = theme === 'dark';

  return (
    <main
      className="app"
      style={{ background: dark ? '#1f2937' : '#fff', color: dark ? '#f9fafb' : '#111' }}
    >
      <h1>useLocalStorage</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        Reload the page or open another tab — values persist and stay in sync.
      </p>

      <section style={{ marginBottom: 20 }}>
        <label>
          Name:{' '}
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name" />
        </label>{' '}
        <button onClick={removeName}>Clear</button>
        <p>Hello, {name || 'stranger'}!</p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <p>Count: {count}</p>
        {/* functional updates */}
        <button onClick={() => setCount((c) => c - 1)}>-</button>{' '}
        <button onClick={() => setCount((c) => c + 1)}>+</button>{' '}
        <button onClick={resetCount}>Reset</button>
      </section>

      <section>
        <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Toggle theme (current: {theme})
        </button>
      </section>
    </main>
  );
}
