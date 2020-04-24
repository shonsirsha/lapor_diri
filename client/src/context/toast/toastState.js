import React, { useReducer } from "react";
import { UPDATE_SUCCESS, UPDATE_FAIL, RESET_UPDATE } from "../types";

import ToastContext from "./toastContext";
import ToastReducer from "./toastReducer";

const toastState = (props) => {
  const initialState = {
    updated: "hidden",
  };

  const updateSuccess = () => {
    dispatch({ type: UPDATE_SUCCESS });
  };

  const updateFail = () => {
    dispatch({ type: UPDATE_FAIL });
  };

  const resetToast = () => {
    dispatch({ type: RESET_UPDATE });
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
