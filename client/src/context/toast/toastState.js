import React, { useReducer } from "react";
import { UPDATE_SUCCESS, UPDATE_FAIL } from "../types";

import ToastContext from "./toastContext";
import ToastReducer from "./toastReducer";

const toastState = (props) => {
  const initialState = {
    updated: "hidden",
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <ToastContext.Provider
      value={{
        updated: state.updated,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default toastState;
