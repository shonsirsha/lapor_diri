import React, { useReducer } from "react";
import { SHOW_TOAST, HIDE_TOAST } from "../types";

import ToastContext from "./toastContext";
import ToastReducer from "./toastReducer";

const ToastState = (props) => {
  const initialState = {};

  const showToast = (msg, type, timeout = 1500) => {
    dispatch({ type: SHOW_TOAST, payload: { msg: msg, type: type } });
    setTimeout(() => {
      hideToast();
    }, timeout);
  };

  const hideToast = () => {
    dispatch({ type: HIDE_TOAST });
  };

  const [state, dispatch] = useReducer(ToastReducer, initialState);

  return (
    <ToastContext.Provider
      value={{
        toast: state,
        showToast,
        hideToast,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastState;
