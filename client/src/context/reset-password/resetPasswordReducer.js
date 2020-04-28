import { RESET_PASSOWRD_VALID_UID, RESET_PASSOWRD_INVALID_UID } from "../types";
export default (state, action) => {
  switch (action.type) {
    case RESET_PASSOWRD_VALID_UID:
      return { ...state, uidValid: true };
    case RESET_PASSOWRD_INVALID_UID:
      return { ...state, uidValid: false };
    default:
      return state;
  }
};
