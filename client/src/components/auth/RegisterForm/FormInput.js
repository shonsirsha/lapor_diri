import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const FormInput = ({ inputType, inputName, onChangeMethod, minLength }) => {
  return (
    <Form.Control
      data-testid='formInput'
      type={inputType}
      name={inputName}
      onChange={onChangeMethod}
      minlength={minLength}
      required
    />
  );
};
FormInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChangeMethod: PropTypes.func,
  minLength: PropTypes.number,
};

FormInput.defaultProps = {
  inputType: "text",
  inputName: "default name prop",
};
export default FormInput;
