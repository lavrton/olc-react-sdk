import { AppDispatch } from '../store';

// Utils
import { get, post, del, patch } from '../../utils/api';

// Action Types
import {
  FETCH_TEMPLATES_REQUEST,
  SET_TEMPLATES,
  SET_DYNAMIC_FIELDS,
  SET_DYNAMIC_FIELD_VALUE,
  CLEAR_DYNAMIC_FIELDS,
  REMOVE_FROM_DYNAMIC_FIELDS,
  GET_PRODUCTS,
  GET_ONE_TEMPLATE,
  TEMPLATE_LOADING,
  CLEAR_FIELDS,
  TEMPLATE_PAGINATION_CHANGE,
  TEMPLATE_SEARCH,
  CLEAR_ALL_TEMPLATE,
  SELECT_PRODUCT,
  SELECT_POSTCARD,
  CLEAR_TEMPLATE_FIELDS,
  GET_DYNAMIC_FIELDS_FROM_SERVER,
  LOAD_DATA_FROM_LOCAL_STORAGE,
  SET_PRODUCT_DETAILS,
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
 * Deletes a template by its ID.
 *
 * @param {string} id - The unique identifier of the template to delete.
 * @returns {Promise<any>} A Promise that resolves to the response indicating
 *                    the success of the template deletion, or rejects
 *                    with an error response in case of failure.
 *
 * @throws {Error} If the request to delete the template fails.
 */
const deleteTemplate = async (id: string): Promise<unknown> => {
  try {
    const response = await del(`templates/${id}`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Retrieves the view proof for a template with the given ID.
 *
 * @param {string} id - The ID of the template for which the view proof is requested.
 * @returns {Promise<object>} - The response object from the GET request, containing the view proof for the template with the given ID.
 * @throws {object} - The error response if there is an error.
 */
const getViewProof = async (id: string): Promise<unknown> => {
  try {
    const response = await get(`templates/${id}/view-proof`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Duplicates a template by its ID.
 *
 * @param {string} id - The unique identifier of the template to duplicate.
 * @param {Object} data - Additional data to be sent with the duplicate request.
 * @returns {Promise<any>} A Promise that resolves to the response containing information
 *                    about the duplicated template, or rejects with an error response
 *                    in case of failure.
 *
 * @throws {Error} If the request to duplicate the template fails.
 */
const doublicateTemplate = async (id: string, data: object): Promise<unknown> => {
  try {
    const response = await post(`templates/${id}/duplicate`, data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};


/**
 * Fetches products and dispatches an action with the product data to the Redux store.
 *
 * @param {Function} dispatch - The dispatch function from the Redux store.
 * @returns {Promise<void>} A Promise that resolves after dispatching the action,
 *                    or rejects if there is an error fetching the products.
 *
 * @throws {Error} If there is an error fetching the products.
 */
const getAllProducts = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await get('products/types');
    dispatch({
      type: GET_PRODUCTS,
      // @ts-ignore
      payload: { products: response?.data?.data },
    });
  } catch (error: any) {
    console.error(error);
  }
};

/**
 * Fetches custom fields and dispatches an action with the custom fields data to the Redux store.
 *
 * @param {Function} dispatch - The dispatch function from the Redux store.
 * @returns {Promise<void>} A Promise that resolves after dispatching the action,
 *                    or rejects if there is an error fetching the custom fields.
 *
 * @throws {Error} If there is an error fetching the custom fields.
 */
const getAllCustomFields = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await get('custom-fields') as Record<string, any>;
    if (response?.status === 200)  {
      const data = response?.data?.data.reduce((acc: any, curr: any) => {
        acc[curr.key.replace(/{{|}}/g, '')] = curr;
        return acc;
      }, {});

      dispatch({ type: GET_DYNAMIC_FIELDS_FROM_SERVER, payload: { data } });
    }
  } catch (error: any) {
    return error.response;
  }
};

/**
 * Fetches product details and dispatches an action with the product details data to the Redux store.
 *
 * @param {object} payload - The payload containing the product details.
 * @returns {Promise<void>} A Promise that resolves after dispatching the action,
 *                    or rejects if there is an error fetching the product details.
 *
 * @throws {Error} If there is an error fetching the product details.
 */
const getProductDetails = (payload: object) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await post('/products/template/details', payload) as Record<string, any>;
    if (response?.status === 200) {
      dispatch({ type: SET_PRODUCT_DETAILS, payload: response?.data?.data });
    }
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
    const response = await post('orders/view-proof-cloud', data);
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
 * Dispatches an action to indicate that templates are being fetched.
 *
 * @returns {object} - The action object.
 */
const fetchTemplatesRequest = () => ({
  type: FETCH_TEMPLATES_REQUEST,
});

/**
 * Dispatches an action with the fetched templates.
 *
 * @param {any[]} templates - The fetched templates.
 * @returns {object} - The action object.
 */
const fetchTemplatesSuccess = (templates: any[]) => ({
  type: SET_TEMPLATES,
  payload: templates,
});



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
 * Changes dynamic input.
 *
 * @param {any} value - The value of the dynamic input.
 * @returns {Function} - The thunk function.
 */
const dynmicInputChange = (value: any) => (dispatch: AppDispatch) => {
  dispatch({ type: SET_DYNAMIC_FIELD_VALUE, payload: { value } });
};

/**
 * Sets dynamic fields.
 *
 * @returns {Function} - The thunk function.
 */
const setDynamicFields = () => (dispatch: AppDispatch) => {
  dispatch({ type: SET_DYNAMIC_FIELDS, payload: {} });
};

/**
 * Removes an item from dynamic fields.
 *
 * @param {any} value - The value of the item to remove.
 * @returns {Function} - The thunk function.
 */
const removeItemFromDynamicField = (value: any) => (dispatch: AppDispatch) => {
  dispatch({ type: REMOVE_FROM_DYNAMIC_FIELDS, payload: { value } });
};

/**
 * Clears dynamic fields.
 *
 * @returns {Function} - The thunk function.
 */
const clearDynaicFields = () => (dispatch: AppDispatch) => {
  dispatch({ type: CLEAR_DYNAMIC_FIELDS });
};


/**
 * Clears filters.
 *
 * @returns {Function} - The thunk function.
 */
const clearFilter = () => (dispatch: AppDispatch) => dispatch({ type: CLEAR_FIELDS });

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


/**
 * Retrieves templates by tab using the provided payload.
 *
 * @param {object} payload - The payload containing the necessary data to filter templates by tab.
 * @returns {Promise<any>} - A promise that resolves with the response data from the server.
 * @throws {object} - The error response if there is an error.
 */
const getAllTemplatesByTab = async (payload: object): Promise<any> => {
  try {
    const response  = await post('templates/by-tab', payload);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export {
  dynmicInputChange,
  setDynamicFields,
  clearDynaicFields,
  removeItemFromDynamicField,
  getAllProducts,
  uploadTemplate,
  getOneTemplate,
  createTemplate,
  updateTemplate,
  clearFilter,
  deleteTemplate,
  getViewProof,
  doublicateTemplate,
  searchAndAdvanceChange,
  clearAllTemplates,
  selectProduct,
  selectPostCard,
  clearTemplateFields,
  getAllCustomFields,
  loadFormDataToStore,
  uploadFile,
  getProductDetails,
  downloadProof,
  getAllTemplateCategories,
  getAllTemplatesByTab
};

