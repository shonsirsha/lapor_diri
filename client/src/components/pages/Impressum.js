import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
const StyledParagraph = styled.p`
  margin: 0;
`;
const Impressum = () => {
  return (
    <Container className="mt-32 mb-32">
      <Row className="mb-32">
        <Col>
          <h1 className="text-center">Impressum</h1>
        </Col>
      </Row>
      <Row className="mb-32">
        <Col>
          <h2>Angaben gemäß § 5 TMG:</h2>
          <StyledParagraph>Botschaft der Republik Indonesien</StyledParagraph>
          <StyledParagraph>Imigrationsabteilung</StyledParagraph>
          <StyledParagraph>Lehrterstr 16-17</StyledParagraph>
        </Col>
      </Row>

      <Row className="mb-32">
        <Col>
          <h2>Kontakt:</h2>
          <StyledParagraph>+49 30 4780 7246 (Berlin) </StyledParagraph>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Haftungsausschluss (Disclaimer)</h2>
          <h4 className="mt-32">Haftung für Inhalte</h4>
          <StyledParagraph>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
            oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </StyledParagraph>

          <h4 className="mt-32">Haftung für Links</h4>
          <StyledParagraph>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </StyledParagraph>

          <h4 className="mt-32">Urheberrecht</h4>
          <StyledParagraph>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </StyledParagraph>
        </Col>
      </Row>
    </Container>
  );
};

export default Impressum;
