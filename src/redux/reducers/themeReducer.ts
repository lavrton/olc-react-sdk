// src/store/themeReducer.ts
import {SET_THEME, RESET_THEME} from '../actions/action-types';
import {ThemeState} from '../actions/themeActions';

export interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

const initialState: ThemeState = {
  primaryColor: '#ed5c2f',
  secondaryColor: '#FFFFFF',
  backgroundColor: '#FFFFFF',
};

const themeReducer = (state = initialState, action: any): ThemeState => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_THEME:
      return initialState;
    default:
      return state;
  }
};

export {themeReducer};
