import { useState } from 'react';
import useToggle from './hooks/useToggle.js';
import useDebounce from './hooks/useDebounce.js';
import useFetch from './hooks/useFetch.js';
import useWindowSize from './hooks/useWindowSize.js';
import usePrevious from './hooks/usePrevious.js';

const box = { padding: 12, marginBottom: 16, border: '1px solid #ddd', borderRadius: 6 };

// 1. useToggle
function ToggleExample() {
  const [isOn, toggle] = useToggle(false);
  return (
    <section style={box}>
      <h3>useToggle</h3>
      <button onClick={toggle}>{isOn ? 'Hide' : 'Show'} message</button>
      {isOn && <p>Hello! 👋</p>}
    </section>
  );
}

// 2. usePrevious
function PreviousExample() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <section style={box}>
      <h3>usePrevious</h3>
      <p>
        Now: {count}, before: {prevCount ?? '-'}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>{' '}
      <button onClick={() => setCount((c) => c + 10)}>+10</button>
    </section>
  );
}

// 3. useWindowSize
function WindowSizeExample() {
  const { width, height } = useWindowSize();
  return (
    <section style={box}>
      <h3>useWindowSize</h3>
      <p>
        {width} × {height} px. Resize the browser window.
      </p>
    </section>
  );
}

// 4. useFetch + 5. useDebounce together: search users
function SearchUsersExample() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500); // waits until typing stops

  // Request only fires when debouncedSearch changes, not on every key press
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users?username_like=${encodeURIComponent(debouncedSearch)}`
  );

  return (
    <section style={box}>
      <h3>useDebounce + useFetch</h3>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by username (e.g. bret)"
        style={{ width: '100%', padding: 6, boxSizing: 'border-box' }}
      />
      <p style={{ fontSize: 13, opacity: 0.7 }}>
        Typed: "{search}", sent to the API: "{debouncedSearch}"
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {!loading && data && (
        <ul>
          {data.length === 0 && <li>No users found</li>}
          {data.map((user) => (
            <li key={user.id}>
              {user.name} (@{user.username})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function CustomHooksDemo() {
  return (
    <main className="app">
      <h1>Custom hooks</h1>
      <ToggleExample />
      <PreviousExample />
      <WindowSizeExample />
      <SearchUsersExample />
    </main>
  );
}
