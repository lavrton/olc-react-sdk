import { combineReducers } from '@reduxjs/toolkit';
import dummyReducer, { DummyState } from './appReducer';

const rootReducer = combineReducers({
  dummy: dummyReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
