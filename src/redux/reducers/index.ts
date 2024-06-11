import { combineReducers } from 'redux';
import templateReducer, { TemplateState } from './templateReducer';

const rootReducer = combineReducers({
  templates: templateReducer,

});

export type RootState = ReturnType<typeof rootReducer>; 
export default rootReducer;
