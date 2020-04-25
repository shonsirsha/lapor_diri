import React, { useReducer } from "react";

import CekContext from "./cekContext";
import CekReducer from "./cekReducer";
import axios from "axios";

import { CEK_REGISTERED, CEK_UNREGISTERED, RESET_UPDATE } from "../types";
const CekState = (props) => {
  const initialState = {
    registered: null,
    status: null,
  };
  const [state, dispatch] = useReducer(CekReducer, initialState);
  const cekRegistrasi = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/cek`, data, config);
      dispatch({ type: CEK_REGISTERED, payload: res.data });
    } catch (err) {
      dispatch({ type: CEK_UNREGISTERED });
    }
  };

  const resetStates = () => {
    dispatch({ type: RESET_UPDATE });
  };
  return (
    <CekContext.Provider
      value={{
        registered: state.registered,
        status: state.status,
        cekRegistrasi,
        resetStates,
      }}
    >
      {props.children}
    </CekContext.Provider>
  );
};

export default CekState;
