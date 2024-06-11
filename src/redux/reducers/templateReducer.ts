import {
    FETCH_TEMPLATES_REQUEST,
    SET_TEMPLATES,
  } from '../actions/templateActions';
  
  export interface TemplateState {
    templates: any[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: TemplateState = {
    templates: [],
    loading: false,
    error: null,
  };
  

const templateReducer = (state = initialState, action: any): TemplateState => {
    switch (action.type) {
      case FETCH_TEMPLATES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SET_TEMPLATES:
        return {
          ...state,
          loading: false,
          templates: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default templateReducer;
  