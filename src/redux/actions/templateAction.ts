import { AppDispatch } from '../store';
import { get } from '../../utils/api';

export const FETCH_TEMPLATES_REQUEST = 'FETCH_TEMPLATES_REQUEST';
export const SET_TEMPLATES = 'SET_TEMPLATES';
export const TEMPLATE_LOADING = 'TEMPLATE_LOADING';

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
      const response = await get('templates');
      dispatch(fetchTemplatesSuccess(response.data));
    } catch (error: any) {
      console.error('Failed to fetch templates:', error);
      return error;
    }
  };
};
