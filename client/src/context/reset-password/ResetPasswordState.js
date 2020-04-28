import React, { useReducer } from "react";

import ResetPasswordContext from "./resetPassword";
import ResetPasswordReducer from "./resetPasswordReducer";
import asJson from "../../utils/asJson";

import axios from "axios";

import { CHECK_UID_RESET_PASSWORD } from "../types";
const ResetPasswordState = (props) => {
  const initialState = {
    uidValid: false,
  };
  const [state, dispatch] = useReducer(ResetPasswordReducer, initialState);

  return (
    <ResetPasswordContext.Provider
      value={{
        uidValid: state.uidValid,
      }}
    >
      {props.children}
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordState;
