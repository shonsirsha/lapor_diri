import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, CLEAR_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //set alert

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg: msg, type: type, id: id } });

    // setTimeout(() => {
    //   dispatch({ type: REMOVE_ALERT, payload: id });
    // }, timeout);
  };

  const clearAllAlerts = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        clearAllAlerts,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
