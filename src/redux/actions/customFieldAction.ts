import { AppDispatch } from '../store';
import { get } from '../../utils/api';

export const FETCH_CUSTOM_FIELDS_REQUEST = 'FETCH_CUSTOM_FIELDS_REQUEST';
export const SET_CUSTOM_FIELDS = 'SET_CUSTOM_FIELDS';

const fetchCustomFieldsRequest = () => ({
  type: FETCH_CUSTOM_FIELDS_REQUEST,
});

const fetchCustomFieldsSuccess = (fields: any[]) => ({
  type: SET_CUSTOM_FIELDS,
  payload: fields,
});

export const fetchCustomFields = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchCustomFieldsRequest());

    try {
      const response = await get('custom-fields');
      // @ts-ignore
      dispatch(fetchCustomFieldsSuccess(response?.data));
    } catch (error: any) {
      console.error('Failed to fetch custom fields:', error);
    }
  };
};
