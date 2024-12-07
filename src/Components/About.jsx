import React from "react";
import "./About.css";
import "./Features.css";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
function About() {
  const abouts = [
    {
      title: "NPR-Pegged Stablecoin",
      description:
        "A stable currency that ensures 1:1 value with the Nepalese Rupee, providing reliability and trust.",
      buttonText: "Learn More",
      buttonLink: "#",
      icon: "🔗",
    },
    {
      title: "Blockchain Transparency",
      description:
        "Track every transaction in real-time with complete transparency using our integration with BSCScan API.",
      buttonText: "Get Started",
      buttonLink: "#",
      icon: "📷",
    },
    {
      title: "Decentralized & Secure",
      description:
        "No intermediaries, no corruption. All transactions are stored on the Binance Smart Chain, making it impossible to tamper with.",
      buttonText: "Download App",
      buttonLink: "#",
      icon: "📲",
    },
  ];
  return (
    <div
      className="aboutmain"
      style={{
        height: "auto",
        width: "100vw",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="aboutcontainer"
        style={{
          margin: "50px 0",
        }}
      >
        <h1 className="abouttitle">DEFI X</h1>
        <p className="aboutdescription">
          Defi X is a decentralized platform designed to bring transparency and
          accountability to public fund management. By leveraging blockchain
          technology, it streamlines processes like fund disbursement, contract
          bidding, and public auditing. Defi X empowers communities to actively
          engage in governance, ensuring fairness, efficiency, and innovation in
          solving urban challenges.
        </p>
      </div>
      <div className="about-section text-white mb-3">
        <Container>
          <Row className="justify-content-center">
            {abouts.map((about, index) => (
              <Col md={4} key={index} className="mb-4 d-flex">
                <Card className="about-card text-center flex-grow-1">
                  <Card.Body>
                    <div className="about-icon mx-auto">{about.icon}</div>
                    <Card.Title style={{ color: "white" }}>
                      {about.title}
                    </Card.Title>
                    <Card.Text>{about.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default About;
