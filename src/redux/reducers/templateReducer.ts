/* eslint-disable no-case-declarations */
import {
  SET_DYNAMIC_FIELDS,
  SET_DYNAMIC_FIELD_VALUE,
  CLEAR_DYNAMIC_FIELDS,
  REMOVE_FROM_DYNAMIC_FIELDS,
  GET_PRODUCTS,
  GET_ALL_TEMPLATES,
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
  CLEAR_TEMPLATE,
  CLEAR_REDUX
} from "../actions/action-types";

export interface DynamicField {
  value: string;
  key: string;
  defaultValue: string;
}

export interface Template {
  title: string;
  product: Product | null;
  templateType: string;
}

export interface Product {
  size: Array<{ size: string }>;
  productType: string;
}

export interface TemplatesState {
  count: number;
  rows: any[];
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
  perPage: number;
  total: number;
  loading: boolean;
  totalRecordsInDB: number | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  loading: boolean;
}

export interface TemplateState {
  title: string;
  product: Product | null;
  dynamicField: string;
  dynamicFields: Record<string, DynamicField>;
  defaultDynamicFieldsHashMap: Record<string, DynamicField>;
  defaultDynamicFields: DynamicField[];
  products: any[];
  productDetailByTemplate: any[];
  templates: TemplatesState;
  templatesPagination: PaginationState;
  template: Template | null;
  totalRecordsInDB: number | null;
  search: string;
  searchProductIds: string;
  searchCreator: string;
  templateType: string;
  envelopeType: string;
  templateLoading: boolean | null;
}



const initialState: TemplateState = {
  title: "",
  product: null,
  dynamicField: "",
  dynamicFields: {},
  defaultDynamicFieldsHashMap: {
    "{{C.FIRST_NAME}}": {
      value: "First Name",
      key: "{{C.FIRST_NAME}}",
      defaultValue: "John",
    },
    "{{C.LAST_NAME}}": {
      value: "Last Name",
      key: "{{C.LAST_NAME}}",
      defaultValue: "Doe",
    },
    "{{C.FIRST_NAME}} {{C.LAST_NAME}}": {
      value: "Full Name",
      key: "{{C.FIRST_NAME}} {{C.LAST_NAME}}",
      defaultValue: "John Doe",
    },
    "{{C.COMPANY_NAME}}": {
      value: "Company Name",
      key: "{{C.COMPANY_NAME}}",
      defaultValue: "ABC Company, Inc.",
    },
    "{{C.ADDRESS_1}}": {
      value: "Address 1",
      key: "{{C.ADDRESS_1}}",
      defaultValue: "123 Main Street",
    },
    "{{C.ADDRESS_2}}": {
      value: "Address 2",
      key: "{{C.ADDRESS_2}}",
      defaultValue: "Suite 2",
    },
    "{{C.CITY}}": {
      value: "City",
      key: "{{C.CITY}}",
      defaultValue: "Lawrence",
    },
    "{{C.STATE}}": {
      value: "State",
      key: "{{C.STATE}}",
      defaultValue: "MA",
    },
    "{{C.ZIP_CODE}}": {
      value: "Zip Code",
      key: "{{C.ZIP_CODE}}",
      defaultValue: "01843",
    },
    "{{C.PHONE_NUMBER}}": {
      value: "Phone Number",
      key: "{{C.PHONE_NUMBER}}",
      defaultValue: "(555) 278-9389",
    },
    "{{C.EMAIL}}": {
      value: "Email",
      key: "{{C.EMAIL}}",
      defaultValue: "johndoe@gmail.com",
    },
  },
  defaultDynamicFields: [
    {
      value: "First Name",
      key: "{{C.FIRST_NAME}}",
      defaultValue: "John",
    },
    {
      value: "Last Name",
      key: "{{C.LAST_NAME}}",
      defaultValue: "Doe",
    },
    {
      value: "Full Name",
      key: "{{C.FIRST_NAME}} {{C.LAST_NAME}}",
      defaultValue: "John Doe",
    },
    {
      value: "Company Name",
      key: "{{C.COMPANY_NAME}}",
      defaultValue: "ABC Company, Inc.",
    },
    {
      value: "Address 1",
      key: "{{C.ADDRESS_1}}",
      defaultValue: "123 Main Street",
    },
    {
      value: "Address 2",
      key: "{{C.ADDRESS_2}}",
      defaultValue: "Suite 2",
    },
    {
      value: "City",
      key: "{{C.CITY}}",
      defaultValue: "Lawrence",
    },
    {
      value: "State",
      key: "{{C.STATE}}",
      defaultValue: "MA",
    },
    {
      value: "Zip Code",
      key: "{{C.ZIP_CODE}}",
      defaultValue: "01843",
    },
    {
      value: "Phone Number",
      key: "{{C.PHONE_NUMBER}}",
      defaultValue: "(555) 278-9389",
    },
    {
      value: "Email",
      key: "{{C.EMAIL}}",
      defaultValue: "johndoe@gmail.com",
    },
  ],
  products: [],
  productDetailByTemplate: [],
  templates: {
    count: 0,
    rows: [],
    currentPage: 1,
    lastPage: 1,
    from: 0,
    to: 0,
    perPage: 20,
    total: 0,
    loading: true,
    totalRecordsInDB: null,
  },
  templatesPagination: { page: 0, pageSize: 20, loading: false },
  template: null,
  totalRecordsInDB: null,
  search: "",
  searchProductIds: "",
  searchCreator: "",
  templateType: "json",
  envelopeType: "",
  templateLoading: null,
};


const templateReducer = (state = initialState, { type, payload }): TemplateState => {
  switch (type) {
    case SET_DYNAMIC_FIELD_VALUE:
      return {
        ...state,
        dynamicField: payload.value,
      };
    case SET_DYNAMIC_FIELDS:
      return {
        ...state,
        dynamicFields: {
          ...state.dynamicFields,
          [state.dynamicField]: {
            value: state.dynamicField,
            key: `{{${state.dynamicField.replace(/ /g, "_").toUpperCase()}}}`,
            defaultValue: `[${state.dynamicField}]`,
          },
        },
        dynamicField: "",
      };
    case REMOVE_FROM_DYNAMIC_FIELDS:
      const dynamicFields = { ...state.dynamicFields };
      delete dynamicFields[payload.value];
      return {
        ...state,
        dynamicFields: dynamicFields,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.products,
      };
    case GET_ALL_TEMPLATES:
      let _rows = [...payload.data.rows];
      if (!payload.refresh) {
        _rows = [...state.templates.rows, ..._rows];
      }
      return {
        ...state,
        templates: {
          ...payload.data,
          rows: _rows,
          loading: false,
        },
        totalRecordsInDB: payload?.data?.totalRecordsInDB,
      };
    case GET_ONE_TEMPLATE:
      return {
        ...state,
        template: payload.data,
        title: payload.type === "copy" ? state.title : payload.data.title,
        product: payload.data.product,
        templateType: payload.data.templateType,
      };
    case CLEAR_TEMPLATE:
      return {
        ...state,
        template: null,
      };
    case TEMPLATE_LOADING:
      return {
        ...state,
        templateLoading: payload,
      };
    case TEMPLATE_PAGINATION_CHANGE:
      return {
        ...state,
        templatesPagination: { ...payload.data },
      };
    case TEMPLATE_SEARCH:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        product: {
          ...payload.product,
          selectedSize: payload.product.size[0].size,
          ...(!payload.productType &&
            payload.product.productType !== "Postcards"
            ? { selectedSize: payload.product.size[0].size }
            : {}),
          ...(payload.productType ? { productType: payload.productType } : {}),
        },
      };
    case SELECT_POSTCARD:
      return {
        ...state,
        product: {
          ...payload.product,
          productType: payload.productType,
        },
      };
    case CLEAR_DYNAMIC_FIELDS:
      return initialState;
    case CLEAR_FIELDS:
      return initialState;
    case CLEAR_ALL_TEMPLATE:
      return {
        ...state,
        templates: { ...initialState.templates },
      };
    case CLEAR_TEMPLATE_FIELDS:
      return {
        ...state,
        title: "",
        product: null,
        dynamicField: "",
        dynamicFields: {},
        templateType: "json",
        envelopeType: "",
      };
    case GET_DYNAMIC_FIELDS_FROM_SERVER:
      return {
        ...state,
        dynamicFields: payload.data,
      };
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetailByTemplate: payload,
      };
    case LOAD_DATA_FROM_LOCAL_STORAGE:
      return {
        ...state,
        title: payload.data.title,
        product: payload.data.product,
        templateType: payload.data.templateType,
        envelopeType: payload.data.envelopeType,
      };
    case CLEAR_REDUX:
      return initialState;
    default:
      return state;
  }
};

export { templateReducer };
