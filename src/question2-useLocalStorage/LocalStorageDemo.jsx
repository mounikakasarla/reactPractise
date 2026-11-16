import useLocalStorage from './useLocalStorage.js';

// Demo: change the values, then reload the page — they are still there.
export default function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '');
  const [count, setCount] = useLocalStorage('demo-count', 0);

  return (
    <main className="app">
      <h1>useLocalStorage</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>Reload the page — values persist.</p>

      <section style={{ marginBottom: 20 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name" />{' '}
        <button onClick={() => setName('')}>Clear</button>
        <p>Hello, {name || 'stranger'}!</p>
      </section>

      <section>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c - 1)}>-</button>{' '}
        <button onClick={() => setCount((c) => c + 1)}>+</button>{' '}
        <button onClick={() => setCount(0)}>Reset</button>
      </section>
    </main>
  );
}
