import React, { useReducer } from "react";

import ResetPasswordContext from "./resetPasswordContext";
import ResetPasswordReducer from "./resetPasswordReducer";
import asJson from "../../utils/asJson";

import axios from "axios";

import { RESET_PASSOWRD_VALID_UID, RESET_PASSOWRD_INVALID_UID } from "../types";
const ResetPasswordState = (props) => {
  const initialState = {
    uidValid: null,
  };
  const [state, dispatch] = useReducer(ResetPasswordReducer, initialState);

  const checkUid = async (encryptedUid) => {
    try {
      await axios.get(`/api/reset-password/check/${encryptedUid}`);
      dispatch({ type: RESET_PASSOWRD_VALID_UID });
    } catch (err) {
      dispatch({ type: RESET_PASSOWRD_INVALID_UID });
    }
  };

  return (
    <ResetPasswordContext.Provider
      value={{
        uidValid: state.uidValid,
        checkUid,
      }}
    >
      {props.children}
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordState;
