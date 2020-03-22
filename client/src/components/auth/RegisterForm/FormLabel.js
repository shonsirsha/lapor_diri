import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const FormLabel = ({ htmlFor }) => {
  return <Form.Label htmlFor={htmlFor}></Form.Label>;
};

FormLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired
};
export default FormLabel;
