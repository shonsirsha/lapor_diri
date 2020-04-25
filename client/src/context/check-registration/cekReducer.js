import { CEK_REGISTERED, CEK_UNREGISTERED, RESET_UPDATE } from "../types";
export default (state, action) => {
  switch (action.type) {
    case CEK_REGISTERED:
      return { ...state, status: action.payload.status, registered: true };
    case CEK_UNREGISTERED:
      return { ...state, status: -1, registered: false };
    case RESET_UPDATE:
      state = { status: null, registered: null };
      return state;
    default:
      return state;
  }
};
