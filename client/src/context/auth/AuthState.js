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
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  RESET_UPDATE,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    updateStatus: -1,
    updated: "hidden",
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
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //update contact

  const updateUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/user/${user._id}`, user, config);
      dispatch({ type: UPDATE_SUCCESS });
    } catch (err) {
      dispatch({ type: UPDATE_FAIL });
    }
  };

  const changePassword = async (user, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/user/change-password/${user._id}`,
        { password: password },
        config
      );
      updateSuccess();
    } catch (err) {
      updateFail();
      return err;
    }
  };

  const uploadDocument = async (userId, doc) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `/api/user/upload-document/${userId}`,
        doc,
        config
      );
      loadUser();
    } catch (err) {
      alert(userId);
      updateFail();
    }
  };

  const deleteDocument = async (userId, docName) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let docObj = { docName: docName };

    try {
      const res = await axios.put(
        `/api/user/delete-document/${userId}`,
        docObj,
        config
      );
    } catch (err) {
      updateFail();
    }
  };

  //logout
  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  const updateSuccess = () => {
    dispatch({ type: UPDATE_SUCCESS });
  };

  const updateFail = () => {
    dispatch({ type: UPDATE_FAIL });
  };

  const resetUpdateStatus = () => {
    dispatch({ type: RESET_UPDATE });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        updated: state.updated,
        updateStatus: state.updateStatus,
        registerUser,
        updateUser,
        changePassword,
        loadUser,
        loginUser,
        logoutUser,
        uploadDocument,
        deleteDocument,
        updateFail,
        updateSuccess,
        resetUpdateStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
