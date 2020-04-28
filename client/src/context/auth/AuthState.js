import React, { useReducer } from "react";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import asJson from "../../utils/asJson";
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
  TOKEN_REFRESH,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    updateStatus: -1,
    userId: localStorage.getItem("userId"),
    refresh_token: localStorage.getItem("refresh_token"),
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
      if (err.response.data.msg === "jwt expired") {
        refreshesToken();
      } else {
        dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
      }
    }
  };

  const registerUser = async (formData) => {
    try {
      const res = await axios.post("/api/user", formData, asJson);
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
    try {
      const res = await axios.post("/api/auth", formData, asJson);
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

  //update user detail
  const updateUser = async (user) => {
    try {
      await axios.put(`/api/user/${user._id}`, user, asJson);
      updateSuccess();
    } catch (err) {
      if (err.response.data.msg === "jwt expired") {
        refreshesToken();
        updateUser(user);
      } else {
        updateFail();
      }
    }
  };

  const changePassword = async (user, password) => {
    try {
      await axios.put(
        `/api/user/change-password/${user._id}`,
        { password: password },
        asJson
      );
      updateSuccess();
    } catch (err) {
      if (err.response.data.msg === "jwt expired") {
        refreshesToken();
        changePassword(user, password);
      } else {
        updateFail();
      }
    }
  };

  const uploadDocument = async (doc) => {
    try {
      await axios.post(
        `/api/user/upload-document/${state.userId}`,
        doc,
        asJson
      );
      loadUser();
    } catch (err) {
      if (err.response.data.msg === "jwt expired") {
        refreshesToken();
        uploadDocument(state.userId, doc);
      } else {
        updateFail();
      }
    }
  };

  const deleteDocument = async (docName) => {
    let docObj = { docName: docName };
    try {
      await axios.put(
        `/api/user/delete-document/${state.userId}`,
        docObj,
        asJson
      );
    } catch (err) {
      if (err.response.data.msg === "jwt expired") {
        refreshesToken();
        deleteDocument(state.userId, docName);
      } else {
        updateFail();
      }
    }
  };

  //logout
  const logoutUser = async () => {
    try {
      await axios.post(
        `/api/auth/logout/${state.userId}`,
        { refresh_token: state.refresh_token },
        asJson
      );
    } catch (err) {
      if (err.response.data.msg === "jwt expired") {
        refreshesToken();
        logoutUser();
      }
    }

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

  const refreshesToken = async () => {
    axios
      .post(
        "/api/auth/refresh_token/" + state.userId,
        {
          refresh_token: state.refresh_token,
        },
        asJson
      )
      .then((res) => {
        dispatch({ type: TOKEN_REFRESH, payload: res.data });
        setAuthToken(localStorage.token); //setting global headers for x-auth-token
      })
      .catch((err) => {
        logoutUser(); // refresh token not found
      });
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
