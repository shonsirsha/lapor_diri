import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
const StyledParagraph = styled.p`
  margin: 0;
`;
const Datenschutz = () => {
  return (
    <Container className="mt-32 mb-32">
      <Row className="mb-32">
        <Col>
          <h1 className="text-center">Datenschutzerklärung</h1>
        </Col>
      </Row>
      <Row className="mb-32">
        <Col>
          <h4>Datenschutz</h4>
          <StyledParagraph>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend der gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            <br />
            <br />
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe
            personenbezogener Daten möglich. Soweit auf unseren Seiten
            personenbezogene Daten (beispielsweise Name, Anschrift oder
            E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
            auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
            Zustimmung nicht an Dritte weitergegeben.
            <br />
            <br />
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
            bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
            Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
            nicht möglich.
          </StyledParagraph>
        </Col>
      </Row>

      <Row className="mb-32">
        <Col>
          <h4>Auskunft, Löschung, Sperrung</h4>
          <StyledParagraph>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
            gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
            und den Zweck der Datenverarbeitung sowie ein Recht auf
            Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu
            weiteren Fragen zum Thema personenbezogene Daten können Sie sich
            jederzeit unter der im Impressum angegebenen Adresse an uns wenden.{" "}
          </StyledParagraph>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>Cookies</h4>
          <StyledParagraph>
            Die Internetseiten verwenden teilweise so genannte Cookies. Cookies
            richten auf Ihrem Rechner keinen Schaden an und enthalten keine
            Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher,
            effektiver und sicherer zu machen. Cookies sind kleine Textdateien,
            die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
            <br />
            <br />
            Die meisten der von uns verwendeten Cookies sind so genannte
            „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch
            gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis
            Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser
            beim nächsten Besuch wiederzuerkennen.
            <br />
            <br />
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
            Cookies informiert werden und Cookies nur im Einzelfall erlauben,
            die Annahme von Cookies für bestimmte Fälle oder generell
            ausschließen sowie das automatische Löschen der Cookies beim
            Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies
            kann die Funktionalität dieser Website eingeschränkt sein.
          </StyledParagraph>

          <h4 className="mt-32">Server-Log-Files</h4>
          <StyledParagraph>
            Der Provider der Seiten erhebt und speichert automatisch
            Informationen in so genannten Server-Log Files, die Ihr Browser
            automatisch an uns übermittelt. Dies sind:
          </StyledParagraph>
          <br />
          <StyledParagraph>
            <ul>
              <li>Browsertyp/ Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>
          </StyledParagraph>
          <br />
          <StyledParagraph>
            Diese Daten sind nicht bestimmten Personen zuordenbar. Eine
            Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
            vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu
            prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige
            Nutzung bekannt werden.
          </StyledParagraph>
        </Col>
      </Row>
    </Container>
  );
};

export default Datenschutz;
