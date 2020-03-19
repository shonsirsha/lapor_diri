import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const FormInput = ({ inputType, inputName, onChangeMethod }) => {
  return (
    <Form.Control
      data-testid='formInput'
      type={inputType}
      name={inputName}
      onChange={onChangeMethod}
      required
    />
  );
};
FormInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChangeMethod: PropTypes.func
};

FormInput.defaultProps = {
  inputType: "text",
  inputName: "default name prop"
};
export default FormInput;
