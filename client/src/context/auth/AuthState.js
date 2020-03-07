import React, { useReducer } from "react";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import axios from "axios";

import { REGISTER_ERROR, REGISTER_SUCCESS } from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("aaaaaaa");
      console.log(err.response.data.msg);
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
