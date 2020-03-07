import { REGISTER_SUCCESS, REGISTER_ERROR } from "../types";
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
    default:
      return state;
  }
};
