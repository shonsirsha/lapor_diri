import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <Container>
          <Row>
            <Col>
              <Link to='/impressum'>Impressum</Link>
              <Link to='/datenschutz'>Datenschutz</Link>
            </Col>

            <Col>
              <p>
                Created by Sean Liesanggoro 2020 incorporated with Atase
                Imigrasi KBRI Berlin.{" "}
                <b>Persembahan anak bangsa untuk negeri</b>.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
