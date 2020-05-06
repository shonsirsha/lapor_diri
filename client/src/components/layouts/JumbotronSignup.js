import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Jumbotron } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledJumbotron = styled(Jumbotron)`
  margin-bottom: 0px;
  margin-top: 64px;
  background: #01712e;
`;
const JumbotronSignup = () => {
  return (
    <StyledJumbotron>
      <StyledContainer>
        <div>
          <h1 className="heroh1special">Belum mendaftar?</h1>
          <h1 className="heroh1special">Segera laporkan diri Anda!</h1>
        </div>

        <Link to="/register">
          <Button variant="success">Daftar Sekarang</Button>{" "}
        </Link>
      </StyledContainer>
    </StyledJumbotron>
  );
};

export default JumbotronSignup;
