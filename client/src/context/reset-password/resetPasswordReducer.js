import {
  RESET_PASSWORD_VALID_UID,
  RESET_PASSWORD_INVALID_UID,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_EMAIL_SENT,
  RESET_PASSWORD_EMAIL_NOT_SENT,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case RESET_PASSWORD_VALID_UID:
      return { ...state, uidValid: true };
    case RESET_PASSWORD_INVALID_UID:
      return { ...state, uidValid: false };
    case RESET_PASSWORD_EMAIL_SENT:
    case RESET_PASSWORD_SUCCESS:
      return { ...state, passwordResetSuccess: true };
    case RESET_PASSWORD_EMAIL_NOT_SENT:
    case RESET_PASSWORD_FAIL:
      return { ...state, passwordResetSuccess: false };
    default:
      return state;
  }
};
