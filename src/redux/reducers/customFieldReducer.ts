import {
  FETCH_CUSTOM_FIELDS_REQUEST,
  SET_CUSTOM_FIELDS,
} from '../actions/customFieldAction';


// TODO: Review this
export interface CustomFieldState {
  customFields: any[];
  defaultDynamicFields: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomFieldState = {
  customFields: [],
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
  loading: false,
  error: null,
};

const customFieldReducer = (state = initialState, action: any): CustomFieldState => {
  switch (action.type) {
    case FETCH_CUSTOM_FIELDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_CUSTOM_FIELDS:
      return {
        ...state,
        loading: false,
        customFields: action.payload,
      };
    default:
      return state;
  }
};

export { customFieldReducer };
