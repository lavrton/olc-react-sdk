import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';
import { customFieldReducer } from './customFieldReducer';
import { snackbarReducers } from '../snackbarReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
  customFields: customFieldReducer,
  snackbarReducers,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
