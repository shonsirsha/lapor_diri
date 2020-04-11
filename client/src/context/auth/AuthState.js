import React, { useReducer } from "react";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load user
  const loadUser = async () => {
    setAuthToken(localStorage.token); //setting global headers for x-auth-token

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
    }
  };

  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/user", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //login user
  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //update contact

  const updateContact = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/user/${user._id}`, user, config);
      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (err) {
      // dispatch({ type: CONTACT_ERROR, payload: err.response.data });
    }
  };

  //logout
  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loadUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
