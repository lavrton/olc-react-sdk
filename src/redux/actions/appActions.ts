import { Dispatch } from 'redux';
import { AppState } from '../reducers';

export const setData = (data: string) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({ type: 'SET_DATA', payload: data });
  };
};
