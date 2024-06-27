// src/store/themeActions.ts
import {SET_THEME, RESET_THEME} from './action-types';

export const setTheme = (theme: ThemeState) => ({
  type: SET_THEME,
  payload: theme,
});

export const resetTheme = () => ({
  type: RESET_THEME,
});

export interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}
