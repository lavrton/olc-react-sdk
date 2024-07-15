//Actions
import { SET_SUCCESS_SNACKBAR, SET_ERROR_SNACKBAR, CLEAR_SNACKBAR } from "../actions/action-types"

// Define the initial state type
interface SnackbarState {
    snackbar: {
        open: boolean;
        status: 'success' | 'error';
        heading: string;
        message: string;
    };
}

const initialState: SnackbarState = {
    snackbar: {
        open: false,
        status: 'success',
        heading: '',
        message: '',
    },
};
export type ActionPayload = {
    type: string; 
    payload: any;
}

const snackbarReducers = (state: SnackbarState = initialState, { type, payload } : ActionPayload)  => {
    switch (type) {
        case SET_SUCCESS_SNACKBAR:
            return { ...state, snackbar: { ...state.snackbar, ...payload, open: true, status: 'success' } };
        case SET_ERROR_SNACKBAR:
            return { ...state, snackbar: { ...state.snackbar, ...payload, open: true, status: 'error' } };
        case CLEAR_SNACKBAR:
            return { ...state, snackbar: { ...state.snackbar, open: false, status: 'success', message: '', heading: '' } };
        default:
            return state;
    }
};

export { snackbarReducers };