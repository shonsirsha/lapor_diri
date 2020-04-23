import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Jumbotron } from "react-bootstrap";

const JumbotronSignup = () => {
  return (
    <Jumbotron
      style={{
        marginBottom: "0px",
        marginTop: "64px",
        background: "#01712E",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 className='heroh1special'>Belum mendaftar?</h1>
          <h1 className='heroh1special'>Segera laporkan diri Anda!</h1>
        </div>

        <Link to='/register'>
          <Button variant='success'>Daftar Sekarang</Button>{" "}
        </Link>
      </Container>
    </Jumbotron>
  );
};

export default JumbotronSignup;
