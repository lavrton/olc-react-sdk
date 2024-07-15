import { AppDispatch } from '../store';

// Utils
import { get, post, patch } from '../../utils/api';

// Action Types
import {
  GET_ONE_TEMPLATE,
  TEMPLATE_LOADING,
  TEMPLATE_PAGINATION_CHANGE,
  TEMPLATE_SEARCH,
  CLEAR_ALL_TEMPLATE,
  SELECT_PRODUCT,
  SELECT_POSTCARD,
  CLEAR_TEMPLATE_FIELDS,
  LOAD_DATA_FROM_LOCAL_STORAGE,
} from './action-types';


/**
 * Makes an HTTP GET request to the 'templates' endpoint and dispatches an action with the retrieved data.
 * @param {number} id - The ID of the template to retrieve.
 * @param {function} dispatch - A function used to dispatch actions to the Redux store.
 * @returns {void}
 */
const getOneTemplate =
  (id: number, type = 'edit') =>
    async (dispatch: AppDispatch): Promise<void> => {
      try {
        const { data } = await get(`templates/${id}`) as any;
        dispatch({ type: GET_ONE_TEMPLATE, payload: { data: data.data, type } });
        dispatch({ type: TEMPLATE_LOADING, payload: true });
      } catch (error: any) {
        return error.response;
      }
    };


/**
 * Uploads a template using the provided template form data.
 *
 * @param {FormData} templateFormData - The form data containing the template files to upload.
 * @returns {Promise<any>} - A promise that resolves with the response from the server.
 * @throws {Error} - If an error occurs during the upload process.
 */
const uploadTemplate = async (templateFormData: FormData): Promise<unknown> => {
  try {
    const response = await post('templates/upload', templateFormData);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Creates a template using the provided data.
 *
 * @param {object} data - The data needed to create the template.
 * @returns {Promise<object>} - A promise that resolves to the response from the successful request or the error response if an error occurs.
 */
const createTemplate = async (data: object): Promise<unknown> => {
  try {
    const response = await post('templates', data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Update a template using the provided data.
 *
 * @param {number} id - The ID of the template to update.
 * @param {object} data - The data needed to create the template.
 * @returns {Promise<object>} - A promise that resolves to the response from the successful request or the error response if an error occurs.
 */
const updateTemplate = async (id: number, data: object): Promise<unknown> => {
  try {
    const response = await patch(`templates/${id}`, data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Loads form data to the store.
 *
 * @param {string} data - The form data in JSON format.
 * @returns {void} - Dispatches an action to the Redux store.
 */
const loadFormDataToStore = (data: string) => (dispatch: AppDispatch): void => {
  try {
    const parsedData = JSON.parse(data);
    dispatch({
      type: LOAD_DATA_FROM_LOCAL_STORAGE,
      payload: { data: parsedData },
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Downloads the proof for the provided data.
 *
 * @param {object} data - The data for which the proof is requested.
 * @returns {Promise<any>} - The response object from the POST request.
 * @throws {object} - The error response if there is an error.
 */
const downloadProof = async (data: object): Promise<unknown> => {
  try {
    const response = await post('/view-proof-cloud', data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};


/**
 * Uploads a file.
 *
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - The file path of the uploaded file.
 * @throws {object} - The error response if there is an error.
 */
const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const response = await post('templates/uploadFile', formData) as Record<string, any>;

    return response?.data?.data?.filePath;
  } catch (error: any) {
    return error?.response;
  }
};


/**
 * Clears template fields.
 *
 * @returns {Function} - The thunk function.
 */
const clearTemplateFields = () => (dispatch: AppDispatch) => {
  dispatch({ type: CLEAR_TEMPLATE_FIELDS });
};


/**
 * Selects a product.
 *
 * @param {any} product - The selected product.
 * @param {string} [productType=''] - The type of the selected product.
 * @returns {Function} - The thunk function.
 */
const selectProduct =
  (product: any, productType = '') =>
    (dispatch: AppDispatch) => {
      dispatch({ type: SELECT_PRODUCT, payload: { product, productType } });
    };


/**
 * Selects a postcard.
 *
 * @param {any} product - The selected product.
 * @param {string} productType - The type of the selected product.
 * @returns {Function} - The thunk function.
 */
const selectPostCard = (product: any, productType: string) => (dispatch: AppDispatch) => {
  dispatch({ type: SELECT_POSTCARD, payload: { product, productType } });
};

/**
 * Clears all templates.
 *
 * @returns {Function} - The thunk function.
 */
const clearAllTemplates = () => (dispatch: AppDispatch) => {
  dispatch({ type: CLEAR_ALL_TEMPLATE });
};

/**
 * Searches and advances change.
 *
 * @param {string} name - The name of the field.
 * @param {any} value - The value of the field.
 * @returns {Function} - The thunk function.
 */
const searchAndAdvanceChange = (name: string, value: any) => (dispatch: AppDispatch) => {
  dispatch({ type: TEMPLATE_SEARCH, payload: { name, value } });
};

/**
 * Retrieves all template categories from the server using an HTTP GET request.
 *
 * @returns {Promise<any>} - A promise that resolves with the response from the server.
 * @throws {object} - The error response if there is an error.
 */
const getAllTemplateCategories = async (): Promise<any> => {
  try {
    const response = await get('templates/categories');
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export {
  uploadTemplate,
  getOneTemplate,
  createTemplate,
  updateTemplate,
  searchAndAdvanceChange,
  clearAllTemplates,
  selectProduct,
  selectPostCard,
  clearTemplateFields,
  loadFormDataToStore,
  uploadFile,
  downloadProof,
  getAllTemplateCategories
};

