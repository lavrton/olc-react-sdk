import { ThunkAction } from 'redux-thunk';
import axios , { AxiosResponse } from 'axios';
import { RootState, AppDispatch } from '../store';
import { AnyAction } from '@reduxjs/toolkit';

export const FETCH_TEMPLATES_REQUEST = 'FETCH_TEMPLATES_REQUEST';
export const SET_TEMPLATES = 'SET_TEMPLATES';

const fetchTemplatesRequest = () => ({
  type: FETCH_TEMPLATES_REQUEST,
});

const fetchTemplatesSuccess = (templates: any[]) => ({
  type: SET_TEMPLATES,
  payload: templates,
});


export const fetchTemplates = () => {
    return async (dispatch: AppDispatch) => { 
      dispatch(fetchTemplatesRequest());
        try {
            const OLC_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJlbWFpbCI6InVzbWFuK2FkbWluQG9wZW5sZXR0ZXJjb25uZWN0LmNvbSIsImFwaUtleUlkIjoiNCIsImlhdCI6MTcxNzUxNDc0MCwiZXhwIjo0ODczMjc0NzQwfQ.D_yEcZ4ZJtM0ArzaYqnV8ggCsT52l4ALbzsX1QkATag';
            const config = {
                headers: {
                Authorization: `Bearer ${OLC_API_KEY}`,
                },
            };
            const response: AxiosResponse = await axios.get(
                'https://stageapi.openletterconnect.com/api/v1/templates',
                config
              );
            dispatch(fetchTemplatesSuccess(response.data));
        } catch (error: any) {
          return error;
        }
    };
  };
