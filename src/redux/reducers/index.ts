import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
