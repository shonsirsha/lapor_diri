import { UPDATE_SUCCESS, UPDATE_FAIL, RESET_UPDATE } from "../types";
export default (state, action) => {
  switch (action.type) {
    case UPDATE_SUCCESS:
      return { updated: "success" };
    case UPDATE_FAIL:
      return { updated: "fail" };
    case RESET_UPDATE:
      return { updated: "hidden" };
    default:
      return state;
  }
};
