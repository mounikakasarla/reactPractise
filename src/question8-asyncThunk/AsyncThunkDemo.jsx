import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store.js';
import { clearUsers, fetchUsers } from './usersSlice.js';

function UsersList() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.users);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => dispatch(fetchUsers())} disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading...' : 'Fetch users'}
        </button>
        <button onClick={() => dispatch(clearUsers())}>Clear</button>
      </div>

      <p style={{ fontSize: 14, opacity: 0.7 }}>Status: {status}</p>

      {status === 'failed' && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      <ul>
        {list.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </>
  );
}

// Provider is placed here (not in main.jsx) so each question stays independent
export default function AsyncThunkDemo() {
  return (
    <Provider store={store}>
      <main className="app">
        <h1>createAsyncThunk</h1>
        <UsersList />
      </main>
    </Provider>
  );
}
