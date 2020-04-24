import { UPDATE_SUCCESS, UPDATE_FAIL } from "../types";
export default (state, action) => {
  switch (action.type) {
    case UPDATE_SUCCESS:
      return state;
    case UPDATE_FAIL:
      return state;
    default:
      return state;
  }
};
