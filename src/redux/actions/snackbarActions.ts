import { AppDispatch } from "../store";
import { SET_SUCCESS_SNACKBAR, SET_ERROR_SNACKBAR, CLEAR_SNACKBAR } from "./action-types"

const success = (message: string, heading: string = '') => (dispatch: AppDispatch) => {
    dispatch({ type: SET_SUCCESS_SNACKBAR, payload: { message, heading } });
}

const failure = (message: string, heading: string = '') => (dispatch: AppDispatch) => {
    dispatch({ type: SET_ERROR_SNACKBAR, payload: { message, heading } });
}

const closeSnackbar = () => (dispatch: AppDispatch) => {
    dispatch({ type: CLEAR_SNACKBAR });
}

export { success, failure, closeSnackbar }
