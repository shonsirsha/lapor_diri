import { SET_ALERT, CLEAR_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      console.log("ASDASDASDAS " + action.payload.id);
      return [...state, action.payload];
    case CLEAR_ALERT:
      state = [];
      return state;
    // state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
