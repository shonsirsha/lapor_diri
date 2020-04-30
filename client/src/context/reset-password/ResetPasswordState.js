import React, { useReducer } from "react";

import ResetPasswordContext from "./resetPasswordContext";
import ResetPasswordReducer from "./resetPasswordReducer";
import asJson from "../../utils/asJson";
import axios from "axios";

import {
  RESET_PASSWORD_VALID_UID,
  RESET_PASSWORD_INVALID_UID,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_EMAIL_SENT,
  RESET_PASSWORD_EMAIL_NOT_SENT,
} from "../types";
const ResetPasswordState = (props) => {
  const initialState = {
    uidValid: null,
    passwordResetSuccess: null,
    error: null,
  };
  const [state, dispatch] = useReducer(ResetPasswordReducer, initialState);

  const sendRequestEmail = async (email) => {
    try {
      await axios.post(`/api/reset-password/send-email`, email, asJson);
      dispatch({ type: RESET_PASSWORD_EMAIL_SENT });
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_EMAIL_NOT_SENT, payload: res.data });
    }
  };

  const checkUid = async (encryptedUid) => {
    try {
      await axios.post(`/api/reset-password/check/${encryptedUid}`);
      dispatch({ type: RESET_PASSWORD_VALID_UID });
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_INVALID_UID, payload: res.data });
    }
  };

  const resetPassword = async (data) => {
    try {
      await axios.put(`/api/reset-password`, data, asJson);
      console.log(JSON.stringify(data));
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_FAIL });
    }
  };

  return (
    <ResetPasswordContext.Provider
      value={{
        uidValid: state.uidValid,
        passwordResetSuccess: state.passwordResetSuccess,
        error: state.error,
        sendRequestEmail,
        checkUid,
        resetPassword,
      }}
    >
      {props.children}
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordState;
