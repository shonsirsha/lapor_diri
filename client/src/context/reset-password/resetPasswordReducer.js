import {
  RESET_PASSWORD_VALID_UID,
  RESET_PASSWORD_INVALID_UID,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_EMAIL_SENT,
  RESET_PASSWORD_EMAIL_NOT_SENT,
  SET_LOADING,
  CLEAR_LOADING,
  RESET_UPDATE,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case RESET_PASSWORD_VALID_UID:
      return { ...state, uidValid: true, loading: false };
    case RESET_PASSWORD_INVALID_UID:
      return { ...state, uidValid: false, loading: false };
    case RESET_PASSWORD_EMAIL_SENT:
    case RESET_PASSWORD_SUCCESS:
      return { ...state, passwordResetSuccess: true, loading: false };
    case RESET_PASSWORD_EMAIL_NOT_SENT:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        passwordResetSuccess: false,
        error: action.payload,
        loading: false,
      };
    case RESET_UPDATE:
      return { ...state, passwordResetSuccess: null };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
