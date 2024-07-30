import { AppDispatch } from '../store';

// Utils
import { get, post, patch } from '../../utils/api';

// Action Types
import {
  TEMPLATE_SEARCH,
  CLEAR_ALL_TEMPLATE,
  SELECT_PRODUCT,
  SELECT_POSTCARD,
  CLEAR_TEMPLATE_FIELDS,
  LOAD_DATA_FROM_LOCAL_STORAGE,
} from './action-types';

/**
 * Uploads a template using the provided template form data.
 *
 * @param {FormData} templateFormData - The form data containing the template files to upload.
 * @returns {Promise<any>} - A promise that resolves with the response from the server.
 * @throws {Error} - If an error occurs during the upload process.
 */
const uploadTemplate = async (templateFormData: FormData): Promise<unknown> => {
  try {
    const response = await post('/templates/upload', templateFormData);
    return response;
  } catch (error: any) {
    return error.response;
  }
};


const getAllTemplatesByTab = async (payload: any) => {
  try {
    const response:any = await post('/templates/by-tab', payload);
    return response?.data?.data;
  } catch (error: any) {
    return error.response;
  }
}

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
    const response = await post('/uploadFile', formData) as Record<string, any>;

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
    const response = await get('/categories');
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export {
  uploadTemplate,
  getAllTemplatesByTab,
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

