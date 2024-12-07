import React from "react";
import Features from "./Features";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
function LandingPage() {
  return (
    <div>
      <div className="hero-section">
        <div className="content">
          <h1>
            Transparent <br />
            Government Funding
            <br /> with Blockchain
          </h1>
          <div className="mx-auto">
            Experience a decentralized financial system with NPR-pegged
            stablecoin <br />
            ensuring secure and transparent government funding at every level.
          </div>
          <button className="get-started-button">Get Started</button>
        </div>
        <div className="background-elements">
          <div className="coin coin1"></div>
          <div className="coin coin2"></div>
          <div className="coin coin3"></div>
          <div className="star star1"></div>
          <div className="star star2"></div>
          <div className="planet"></div>
        </div>
      </div>
      <Features />

      {/* Section 1 */}
      <div className="section how-it-works">
        <div
          className="container-fluid d-flex flex-column align-items-center justify-content-center"
          style={{ margin: "0 auto", padding: "50px 15px" }}
        >
          <Row className="w-100">
            <Col sm={2}></Col>
            <Col sm={6}>
              {" "}
              <h2>How It Works?</h2>
              <p>
                Funds start from the central government and flow seamlessly
                through different branches—provinces, municipalities, and
                wards—ensuring that every transaction is visible, trackable, and
                verified on the blockchain.
              </p>{" "}
              <Button className="learn-more-btn">Learn More</Button>
            </Col>
            <Col sm={4}>
              {" "}
              <div className="abstract-graphic"></div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Section 2 */}
      <div className="section financial-transparency">
        <Container>
          <Row>
            <Col md={5} className="graphic-container">
              <div className="shield-graphic"></div>
            </Col>
            <Col md={7}>
              <h2>
                Join Us on the Journey <br /> to Financial <br /> Transparency
              </h2>
              <p>
                We invest more resources than any other platform in making sure
                great support from real people is a click away, whenever you
                need it.
              </p>
              <Button className="get-started-btn">Get Started</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;
