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
} from "../types";
const ResetPasswordState = (props) => {
  const initialState = {
    uidValid: null,
    passwordResetSuccess: null,
  };
  const [state, dispatch] = useReducer(ResetPasswordReducer, initialState);

  const checkUid = async (encryptedUid) => {
    try {
      await axios.get(`/api/reset-password/check/${encryptedUid}`);
      dispatch({ type: RESET_PASSWORD_VALID_UID });
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_INVALID_UID });
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
        checkUid,
        resetPassword,
      }}
    >
      {props.children}
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordState;
