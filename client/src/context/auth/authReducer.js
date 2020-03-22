import { REGISTER_SUCCESS, REGISTER_ERROR, USER_LOADED } from "../types";
export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload, //token
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null
      };
    default:
      return state;
  }
};
