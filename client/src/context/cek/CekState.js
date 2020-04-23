import React, { useReducer } from "react";

import CekContext from "./cekContext";
import CekReducer from "./cekReducer";
import axios from "axios";

import { CEK_REGISTRASI } from "../types";
const CekState = (props) => {
  const initialState = {
    nama_belakang: "",
    paspor: "",
  };
  const [state, dispatch] = useReducer(CekReducer, initialState);
  const cekRegistrasi = async (data) => {};
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
