import React, { useReducer } from "react";

import ResetPasswordContext from "./resetPasswordContext";
import ResetPasswordReducer from "./resetPasswordReducer";
import asJson from "../../utils/asJson";

import axios from "axios";

import { CHECK_UID_RESET_PASSWORD } from "../types";
const ResetPasswordState = (props) => {
  const initialState = {
    uidValid: false,
  };
  const [state, dispatch] = useReducer(ResetPasswordReducer, initialState);

  const checkUid = async (encryptedUid) => {
    try {
      const res = await axios.post(
        `/api/reset-password/check/${encryptedUid}`,
        data,
        asJson
      );
      dispatch({ type: CHECK_REGISTERED, payload: res.data });
    } catch (err) {
      dispatch({ type: CHECK_UNREGISTERED });
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
