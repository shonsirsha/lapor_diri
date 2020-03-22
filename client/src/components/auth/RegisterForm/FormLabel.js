import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const FormLabel = ({ htmlFor, text }) => {
  return (
    <Form.Label data-testid='formLabel' htmlFor={htmlFor}>
      {text}
    </Form.Label>
  );
};

FormLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

FormLabel.defaultProps = {
  htmlFor: "some html element",
  text: "label text"
};

export default FormLabel;
