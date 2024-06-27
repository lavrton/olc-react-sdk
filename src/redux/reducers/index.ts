import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';
import { customFieldReducer } from './customFieldReducer';
import { snackbarReducers } from './snackbarReducer';
import { themeReducer } from './themeReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
  customFields: customFieldReducer,
  snackbarReducers,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
