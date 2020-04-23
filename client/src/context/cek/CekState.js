import React, { useReducer } from "react";

import CekContext from "./cekContext";
import CekReducer from "./cekReducer";
import axios from "axios";

import { CEK_SUCCESS } from "../types";
const CekState = (props) => {
  const initialState = {
    registered: false,
    status: 0,
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
      dispatch({ type: CEK_SUCCESS, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <CekContext.Provider
      value={{
        nama_belakang: state.nama_belakang,
        paspor: state.paspor,
        cekRegistrasi,
      }}
    >
      {props.children}
    </CekContext.Provider>
  );
};

export default CekState;
