import React, { Fragment } from "react";
import { Button, Row, Col, Card, Alert, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const SpecialLink = styled(Link)`
  text-decoration: underline;
`;
const HomeGuestView = () => {
  const notice = (
    <Row>
      <Col>
        <StyledAlert key="1" variant="warning">
          <h3>PEMBERITAHUAN</h3>
          <b>
            Bagi WNI yang telah lapor diri sebelum adanya aplikasi ini, harap
            mengaktualisasi datanya dengan{" "}
            <SpecialLink to="/cek-registrasi">Cek Registrasi</SpecialLink>
          </b>
        </StyledAlert>
      </Col>
    </Row>
  );

  return (
    <Fragment>
      {notice}
      <Row>
        <Col className="mb-64">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Mengapa Lapor Diri?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p className="lead">
                    Hal hal mengenai lapor diri telah di atur dalam
                    undang-undang:
                  </p>
                  <p>
                    <b>
                      UU Nomor 12 Tahun 2006 Tentang Kewarganegaraan Republik
                      Indonesia{" "}
                    </b>
                  </p>
                  <p>
                    <b>
                      UU Nomor 23 Tahun 2006 Tentang Administrasi Kependudukan
                    </b>
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Manfaat Lapor Diri
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p className="lead">
                    Dengan melaporkan diri pengatasan masalah akan menjadi lebih
                    mudah :
                  </p>
                  <ol>
                    <li>
                      Pembuatan Dokumen yang hilang akan menjadi lebih cepat dan
                      mudah pengurusannya
                    </li>
                    <li>
                      Dapat memberikan bantuan secara cepat apabila terjadi
                      musibah
                    </li>
                    <li>
                      Pemberian Informasi yang akurat kepada keluarga di
                      Indonesia
                    </li>
                    <li>
                      Memberi kemudahan dalam mengurus surat-surat yang
                      membutuhkan legalisasi pada perwakilan RI di Jerman
                    </li>
                  </ol>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col>
          <p className="lead">Terkadang ada musibah yang menimpa seperti : </p>
          <ul>
            <li>Kecurian</li>
            <li>Kecelakaan</li>
            <li>Bencana Alam</li>
            <li>Sakit parah</li>
            <li>Meninggal dunia</li>
          </ul>
          <p>
            yang dimana dapat menyebabkan keluarga di Indonesia kehilangan
            kontak dan Pihak Universitas menanyakan kehadiran dan dengannya LaDi
            semua permasalahan akan menjadi lebih mudah dan akan mendapatkan
            penyelesaian yang lebih cepat.{" "}
          </p>
          <p>
            <b>Ayo Lapor Diri!</b>
          </p>
        </Col>
      </Row>
    </Fragment>
  );
};

export default HomeGuestView;
