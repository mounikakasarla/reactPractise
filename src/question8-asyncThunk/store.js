import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice.js';

// configureStore adds thunk support automatically
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
