import { SHOW_TOAST, HIDE_TOAST } from "../types";
export default (state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        msg: action.payload.msg,
        type: action.payload.type,
      };
    case HIDE_TOAST:
      state = {};
      return state;
    default:
      return state;
  }
};
