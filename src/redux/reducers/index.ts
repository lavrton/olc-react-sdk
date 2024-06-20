import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';
import { snackbarReducers } from '../snackbarReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
  snackbarReducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
