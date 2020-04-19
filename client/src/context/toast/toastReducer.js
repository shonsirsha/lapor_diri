import {
    UPDATE_PASSWORD
  } from "../types";
  export default (state, action) => {
    switch (action.type) {
      case UPDATE_PASSWORD:
          return {...state, status: action.payload}
      default:
        return state;
    }
  };
  