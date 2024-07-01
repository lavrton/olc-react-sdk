// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; 

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware : any) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
