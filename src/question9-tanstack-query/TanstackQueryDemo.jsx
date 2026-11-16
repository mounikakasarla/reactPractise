import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// 1. One client holds the cache for every query
const queryClient = new QueryClient();

// 2. Plain async functions that fetch data (throw on error)
async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

async function fetchUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

function UserDetails({ id }) {
  // The key includes `id`, so each user is cached separately.
  // Click a user, then another, then the first again: the 3rd click is instant (from cache).
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  if (isPending) return <p>Loading user...</p>;
  if (isError) return <p style={{ color: 'crimson' }}>Error: {error.message}</p>;

  return (
    <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 6 }}>
      <h3 style={{ marginTop: 0 }}>{data.name}</h3>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Company: {data.company.name}</p>
    </div>
  );
}

function Users() {
  const [selectedId, setSelectedId] = useState(null);

  // 3. useQuery: give it a unique key + a function that returns data
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 60_000, // treat data as fresh for 60s (no refetch in that time)
  });

  if (isPending) return <p>Loading users...</p>;
  if (isError) return <p style={{ color: 'crimson' }}>Error: {error.message}</p>;

  return (
    <>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refetch'}
      </button>

      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <ul style={{ flex: 1, paddingLeft: 20 }}>
          {data.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => setSelectedId(user.id)}
                style={{ fontWeight: user.id === selectedId ? 'bold' : 'normal' }}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ flex: 1 }}>
          {selectedId ? <UserDetails id={selectedId} /> : <p>Select a user</p>}
        </div>
      </div>
    </>
  );
}

// Provider is placed here (not in main.jsx) so each question stays independent
export default function TanstackQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app">
        <h1>TanStack Query: useQuery</h1>
        <Users />
      </main>
    </QueryClientProvider>
  );
}
