import { CEK_SUCCESS } from "../types";
export default (state, action) => {
  switch (action.type) {
    case CEK_SUCCESS:
      return { ...state, status: action.payload.status, registered: true };
    default:
      return state;
  }
};
