import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const FormInput = ({
  inputType,
  inputName,
  onChangeMethod,
  minLength,
  value,
}) => {
  return (
    <Form.Control
      data-testid='formInput'
      type={inputType}
      name={inputName}
      onChange={onChangeMethod}
      minLength={minLength}
      value={value}
      required
    />
  );
};
FormInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChangeMethod: PropTypes.func,
  minLength: PropTypes.number,
  value: PropTypes.string,
};

FormInput.defaultProps = {
  inputType: "text",
  inputName: "default name prop",
};
export default FormInput;
