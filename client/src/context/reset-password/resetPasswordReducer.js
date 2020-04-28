import { CHECK_UID_RESET_PASSWORD } from "../types";
export default (state, action) => {
  switch (action.type) {
    case CHECK_UID_RESET_PASSWORD:
      return state;
    default:
      return state;
  }
};
