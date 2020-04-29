import {
  RESET_PASSWORD_VALID_UID,
  RESET_PASSWORD_INVALID_UID,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case RESET_PASSWORD_VALID_UID:
      return { ...state, uidValid: true };
    case RESET_PASSWORD_INVALID_UID:
      return { ...state, uidValid: false };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, passwordResetSuccess: true };
    case RESET_PASSWORD_FAIL:
      return { ...state, passwordResetSuccess: false };
    default:
      return state;
  }
};
