import React, { useReducer } from "react";
import RegisterReducer from "./registerReducer";
import RegisterContext from "./registerContext";
import axios from "axios";

import { REGISTER_SUCCESS, REGISTER_ERROR } from "../types";

const RegisterState = props => {
  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    const res = await axios.post("/api/users", formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    try {
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  return (
    <RegisterContext.Provider values={{}}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterState;
