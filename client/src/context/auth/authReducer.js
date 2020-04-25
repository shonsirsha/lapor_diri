import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  RESET_UPDATE,
  JWT_EXPIRED,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload, //token
        isAuthenticated: true,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updateStatus: 1,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updateStatus: 0,
      };
    case RESET_UPDATE:
      return {
        ...state,
        updateStatus: -1,
      };
    case AUTH_ERROR:
    case REGISTER_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case JWT_EXPIRED:
      localStorage.removeItem("token");

      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload, //token
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};
