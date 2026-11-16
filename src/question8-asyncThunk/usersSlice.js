import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. The async thunk: does the API call.
//    Redux Toolkit creates 3 actions for it automatically:
//    users/fetchUsers/pending, users/fetchUsers/fulfilled, users/fetchUsers/rejected
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error(`Request failed: ${res.status}`); // → rejected
  return res.json(); // → becomes action.payload in "fulfilled"
});

// 2. The slice: stores the data + loading/error status
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearUsers(state) {
      state.list = [];
      state.status = 'idle';
    },
  },
  // 3. Handle the 3 thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
