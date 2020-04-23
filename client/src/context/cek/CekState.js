import React, { useReducer } from "react";

import CekContext from "./cekContext";
import CekReducer from "./cekReducer";
import axios from "axios";

const CekState = () => {
  const initialState = {};
  const [state, dispatch] = useReducer(CekReducer, initialState);
  return <CekContext.Provider value={{}}>{props.children}</CekContext.Provider>;
};

export default CekState;
