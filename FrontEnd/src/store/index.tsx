import { configureStore } from '@reduxjs/toolkit';
import dicReducer from './dic'; // Make sure the path to 'dic' is correct

const store = configureStore({
  reducer: {
    dic: dicReducer,
  },
});

// Export types for use in components and thunks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
