import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const FormLabel = ({ htmlFor, text }) => {
  return <Form.Label htmlFor={htmlFor}>{text}</Form.Label>;
};

FormLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired
};

FormLabel.defaultProps = {
  htmlFor: "some html element"
};

export default FormLabel;
