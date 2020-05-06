import React from "react";
import spinner from "./spinner.gif";
import styled from "styled-components";
const StyledImg = styled.img`
  width: 180px;
  height: 180px;
  display: block;
  margin: auto;
`;
const Spinner = () => {
  return <StyledImg alt="Loading..." src={spinner} />;
};

export default Spinner;
