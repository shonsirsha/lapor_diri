import React, { useReducer } from "react";

import CheckRegistrationContext from "./checkRegistrationContext";
import CheckRegistrationReducer from "./checkRegistrationReducer";
import axios from "axios";

import { CHECK_REGISTERED, CHECK_UNREGISTERED, RESET_UPDATE } from "../types";
const CheckRegistrationState = (props) => {
  const initialState = {
    registered: null,
    status: null,
  };
  const [state, dispatch] = useReducer(CheckRegistrationReducer, initialState);
  const checkRegistration = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/cek`, data, config);
      dispatch({ type: CHECK_REGISTERED, payload: res.data });
    } catch (err) {
      dispatch({ type: CHECK_UNREGISTERED });
    }
  };

  const resetStates = () => {
    dispatch({ type: RESET_UPDATE });
  };
  return (
    <CheckRegistrationContext.Provider
      value={{
        registered: state.registered,
        status: state.status,
        checkRegistration: checkRegistration,
        resetStates,
      }}
    >
      {props.children}
    </CheckRegistrationContext.Provider>
  );
};

export default CheckRegistrationState;
