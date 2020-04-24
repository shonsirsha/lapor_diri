import { SHOW_TOAST, HIDE_TOAST } from "../types";
export default (state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      state = { msg: action.payload.msg, type: action.payload.type };
      return state;
    case HIDE_TOAST:
      state = null;
      return state;
    default:
      return state;
  }
};
